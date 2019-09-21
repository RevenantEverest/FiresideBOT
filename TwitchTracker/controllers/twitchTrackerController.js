const config = require('../config/config');
const Discord = require('discord.js');
const db = require('../models/twitchTrackerDB');
const twitchServices = require('../services/twitchServices');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function post(bot, info) {
    info.forEach(el => {
        if(config.channelsLive.includes(el.twitch_id)) return;
        else config.channelsLive.push(el.twitch_id);

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xcc66ff)
        .setThumbnail(el.logo)
        .setTitle(`${el.username} is now LIVE`)
        .addBlankField()
        .addField('Title:', el.title, true)
        .addField('Playing:', el.game, true)
        .addField("Click To Watch:", `[Click Me](https://twitch.tv/${el.username})`, true)

        el.guilds.forEach(guild => {
            let role_mention = (guild.role_id === "@everyone" ? "@everyone" : (guild.role_id === "none" ? '' : `<@&${guild.role_id}>`));
            bot.guilds.get(guild.guild_id).channels.get(guild.channel_id).send(role_mention, embed);
        })
    })
};

async function parseData(bot, trackers, streamStatus, gameData, logoData) {
    let data = [];
    streamStatus.forEach(async (stream, idx) => {
        let game = gameData.filter(el => stream.game_id === el.id)[0];
        let logo = logoData.filter(el => stream.user_id === el.id)[0];
        let info = { 
            logo: logo.profile_image_url, 
            username: stream.user_name, 
            twitch_id: stream.user_id,
            title: stream.title,
            game: game ? game.name : "No Game",
            guilds: [] 
        };
        trackers.filter(el => el.twitch_id === stream.user_id).forEach(el => info.guilds.push(el));
        data.push(info);
        if(idx === (streamStatus.length - 1)) post(bot, data);
    });
};

async function getTwitchLogos(bot, trackers, streamStatus, gameData) {
    let promises = [];
    twitch_ids = trackers.map(el => el.twitch_id);
    twitch_ids.filter((el, idx) => twitch_ids.indexOf(el) == idx).forEach(el => promises.push(twitchServices.getTwitchInfo(el)));
    Promise.all(promises)
    .then(logos => parseData(bot, trackers, streamStatus, gameData, [].concat.apply([], logos.map(el => el.data.data)).filter(el => el !== undefined)))
    .catch(err => console.error(err));
};

async function getTwitchGames(bot, trackers, streamStatus) {
    let promises = [];
    let game_ids = streamStatus.map(el => el.game_id);
    game_ids = game_ids.filter((el, idx) => game_ids.indexOf(el) == idx);

    game_ids.forEach(el => promises.push(twitchServices.getTwitchGame(el)));
    Promise.all(promises)
    .then(games => getTwitchLogos(bot, trackers, streamStatus, [].concat.apply([], games.map(el => el.data.data)).filter(el => el !== undefined)))
    .catch(err => console.error(err));
};

module.exports = {
    runCheck(bot) {
        db.findAll()
        .then(trackers => {
            let promises = [];
            twitch_ids = trackers.map(el => el.twitch_id);
            twitch_ids.filter((el, idx) => twitch_ids.indexOf(el) == idx).forEach(el => promises.push(twitchServices.getTwitchStreamStatus(el)));
            Promise.all(promises).then(streamStatus => {
                streamStatus = streamStatus.map(el => el.data.data[0] ? el.data.data[0] : '').filter(el => el !== '');
                let channelsLive = streamStatus.map(el => el.user_id)
                config.channelsLive.forEach(el => {
                    if(!channelsLive.includes(el)) config.channelsLive.splice(config.channelsLive.indexOf(el), 1);
                })
                if(streamStatus[0]) getTwitchGames(bot, trackers, streamStatus);
            })
            .catch(err => console.error(err));
        })
        .catch(err => err instanceof QRE && err.code === qrec.noData ? console.log("No Trackers") : console.error(err));
    }
};