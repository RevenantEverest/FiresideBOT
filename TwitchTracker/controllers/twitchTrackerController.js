const config = require('../config/config');
const Discord = require('discord.js');
const db = require('../models/twitchTrackerDB');
const twitchServices = require('../services/twitchServices');
const tokenController = require('./tokenController');
const flavorTextParser = require('./flavorTextParser');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function generateQuery(trackers) {
    let query = '';
    let batchData = [];
    trackers.forEach((el, idx) => {
        if(idx % 100 === 0 && idx !== 0) {
            query = query.substring(0, query.length - 1);
            batchData.push(query);
            query = '';
        }
        else query += `user_id=${el.twitch_id}&`;
    });

    query = query.substring(0, query.length - 1);
    batchData.push(query);
    return batchData;
};

services.run = async (bot) => {
    console.log("Running...")
    db.findAll()
    .then(trackers => getStreamStatus(trackers))
    .catch(err => err instanceof QRE && err.code === qrec.noData ? console.log("No Trackers") : console.error(err));

    async function getStreamStatus(trackers) {
        console.log("Inside Get Stream Status")
        let temp = [];
        trackers.forEach(el => {
            if(temp.map(tracker => tracker.twitch_id).includes(el.twitch_id)) return;
            let data = {
                twitch_id: el.twitch_id,
                guildInfo: trackers.filter(tracker => tracker.twitch_id === el.twitch_id)
            };
            temp.push(data);
        });
        
        let batches = await generateQuery(temp);
        let promises = [];

        batches.forEach(el => promises.push(twitchServices.getTwitchStreamStatus(el)));

        Promise.all(promises)
        .then(streams => {
            streams = [].concat.apply([], streams.map(el => el.data.data));
            checkChannelsLive(temp, streams);
        })
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401)
                    return tokenController.updateToken(() => services.run(bot));
                else console.error(err.response);
            }
            else console.error(err);
        });
    };

    function checkChannelsLive(trackerData, streams) {
        let currentLive = streams.map(el => el.user_id);
        trackerData = trackerData.filter(el => currentLive.includes(el.twitch_id));
        currentLive.forEach(el => {
            if(config.channelsLive.includes(el))
                trackerData.splice(trackerData.map(el => el.twitch_id).indexOf(el), 1);
            else 
                config.channelsLive.push(el);
        });

        config.channelsLive.forEach(el => {
            if(!currentLive.includes(el))
                config.channelsLive.splice(config.channelsLive.indexOf(el), 1);
        });

        if(!trackerData[0]) return;

        getTwitchGames(trackerData, streams);
    };

    function getTwitchGames(trackerData, streams) {
        let game_ids = streams.map(el => el.game_id);
        let query = '';
        game_ids.forEach(el => query += `id=${el}&`);

        twitchServices.getTwitchGame(query)
        .then(games => getTwitchLogos(trackerData, streams, games.data.data))
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401) 
                    return tokenController.updateToken(() => services.run(bot));
                else console.error(err.response);
            }
            else console.error(err);
        });
    };

    function getTwitchLogos(trackerData, streams, games) {
        let query = '';
        trackerData.forEach(el => query += `id=${el.twitch_id}&`);

        twitchServices.getTwitchInfo(query)
        .then(twitchUsers => parseData(trackerData, streams, games, twitchUsers.data.data))
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401) 
                    return tokenController.updateToken(() => services.run(bot));
                else console.error(err.response);
            }
            else console.error(err);
        });
    };

    function parseData(trackerData, streams, games, twitchUsers) {
        let temp = [];
        trackerData.forEach(el => {
            let twitchUser = twitchUsers.filter(user => user.id === el.twitch_id)[0];
            let streamData = streams.filter(stream => stream.user_id === el.twitch_id)[0];
            let gameData = games.filter(game => game.id === streamData.game_id)[0];
            let data = {
                twitch_id: el.twitch_id,
                display_name: streamData.user_name,
                title: streamData.title,
                viewers: streamData.viewer_count,
                logo: twitchUser.profile_image_url,
                thumbnail_url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamData.user_name.toLowerCase()}-600x338.jpg`,
                game: gameData ? gameData.name : "No Game",
                guildInfo: el.guildInfo
            };
            temp.push(data);
        });
        trackerData = temp;

        sendEmbed(trackerData);
    };

    function sendEmbed(trackerData) {
        trackerData.forEach(el => {
            // Create Cron Job To Purge Image Channel Every 14 days
            bot.channels.get("684308884139016210").send(`Attachment for ${el.display_name}`, { files: [el.thumbnail_url] })
            .then(msg => {

                let embed = new Discord.RichEmbed();

                embed
                .setAuthor(`${el.display_name} is now LIVE`, el.logo)
                .setThumbnail(el.logo)
                .setColor(0xcc66ff)
                .setDescription(`[${el.title}](https://twitch.tv/${el.display_name})`)
                .addField("Playing:", el.game, true)
                .addField("Viewers:", el.viewers.toLocaleString(), true)
                .setImage(msg.attachments.array()[0].url)
                .setFooter('Powered By Twitch API', 'https://i.imgur.com/DwmLOBU.png')

                el.guildInfo.forEach(async guild => {
                    if(!bot.guilds.get(guild.guild_id)) return;
                    else if(!bot.guilds.get(guild.guild_id).channels.get(guild.channel_id)) return console.log("Invalid Channel");

                    let role_mention = "";

                    if(process.env.ENVIRONMENT === "DEV" && guild.guild_id !== "427883469092159490") return;
                    if(guild.flavor_text && guild.flavor_text !== "") 
                        guild.flavor_text = await flavorTextParser(guild.flavor_text, guild, el.display_name);
                    else if(guild.role_id && guild.role_id === "@everyone") role_mention = "@everyone";
                    else if(guild.role_id && guild.role_id === "none") role_mention = " ";
                    else if(guild.role_id) role_mention = `<@&${guild.role_id}>`;
                    
                    bot.guilds.get(guild.guild_id).channels.get(guild.channel_id).send(role_mention ? role_mention : guild.flavor_text, embed);
                });
            });
        });
    };
};

module.exports = services;