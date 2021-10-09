const Discord = require('discord.js');
const youtubeServices = require('../services/youtubeServices');
const db = require('../models/youtubeTrackersDB');
const config = require('../config/config');
const flavorTextParser = require('./flavorTextParser');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const isLiveRegex = /{"text":" watching"}/i;
const channelIdRegex = /(?<=itemprop="channelId" content=")(.*?)(?=")/i;
const channelNameRegex = /(?<="shortBylineText":{"runs":\[{"text":")(.*?)(?=")/i;
const titleRegex = /(?<="simpleText":")(.*?)(?=")/i;
const thumbnailRegex = /(?<={"thumbnails":\[{"url":")(.*?)(?=")/i;
const profileImageRegex = /(?<={"url":"https:\/\/yt3\.ggpht\.com\/ytc\/)(.*?)(?==)/i;
const viewCountRegex = /(?<="viewCountText":{"runs":\[{"text":")(.*?)(?="})/i;
const videoIdRegex = /(?<={"videoId":")(.*?)(?=")/i;

services.run = async (bot) => {
    db.findAll()
    .then(trackers => getStreamStatus(trackers))
    .catch(err => err instanceof QRE && err.code === qrec.noData ? console.log("No Trackers") : console.error(err));

    function getStreamStatus(trackers) {
        let temp = [];
        trackers.forEach(el => {
            if(temp.map(tracker => tracker.youtube_channel_id).includes(el.youtube_channel_id)) return;
            let data = {
                youtube_channel_id: el.youtube_channel_id,
                guildInfo: trackers.filter(tracker => tracker.youtube_channel_id === el.youtube_channel_id)
            };
            temp.push(data);
        });

        let promises = [];
        temp.forEach(el => promises.push(youtubeServices.getChannelPage(el.youtube_channel_id)));

        Promise.all(promises)
        .then(streams => {
            streams = [].concat.apply([], streams.map(el => el.data).filter(el => isLiveRegex.exec(el)));
            streams = streams.map(el => {
                el = el.toString();
                let channelIdResult = el.match(channelIdRegex);
                let channelNameResult = el.match(channelNameRegex);
                let titleResult = el.match(titleRegex);
                let profileImageResult = el.match(profileImageRegex);
                let thumbnailResult = el.match(thumbnailRegex);
                let viewCountResult = el.match(viewCountRegex);
                let videoIdResult = el.match(videoIdRegex);

                let data = {
                    youtube_channel_id: channelIdResult[0],
                    channelName: channelNameResult[0],
                    title: titleResult[0],
                    profileImage: "https://yt3.ggpht.com/ytc/" + profileImageResult[0] + "=s176-c-k-c0x00ffffff-no-rj",
                    thumbnail: encodeURI(thumbnailResult[0]),
                    viewCount: viewCountResult[0],
                    videoURL: "https://youtube.com/watch?v=" + videoIdResult[0]
                };
                return data;
            });
            checkChannelsLive(temp, streams);
        })
        .catch(err => console.error(err));
    };

    function checkChannelsLive(trackers, streams) {
        let currentLive = streams.map(el => el.youtube_channel_id);
        trackers = trackers.filter(el => currentLive.includes(el.youtube_channel_id));
        currentLive.forEach(tracker => {
            if(config.channelsLive.includes(tracker))
                trackers.splice(trackers.map(el => el.youtube_channel_id).indexOf(tracker), 1);
            else config.channelsLive.push(tracker);
        });

        config.channelsLive.forEach(el => {
            if(!currentLive.includes(el))
                config.channelsLive.splice(config.channelsLive.indexOf(el), 1);
        });

        if(!trackers[0]) return;

        parseData(trackers, streams);
    };

    function parseData(trackers, streams) {
        let temp = [];
        trackers.forEach(el => {
            let streamData = streams.filter(stream => stream.youtube_channel_id === el.youtube_channel_id)[0];
            streamData.guildInfo = el.guildInfo;

            temp.push(streamData);
        });

        trackers = temp;

        sendEmbed(trackers);
    };

    function sendEmbed(trackers) {
        trackers.forEach(tracker => {
            let embed = new Discord.MessageEmbed();
    
            embed
            .setColor(0xff0000)
            .setAuthor(`${tracker.channelName} is now LIVE`, tracker.profileImage)
            .setThumbnail(tracker.profileImage)
            .setDescription(`[${tracker.title}](${tracker.videoURL})`)
            .addField("Viewers:", tracker.viewCount.toLocaleString())
            .setImage(tracker.thumbnail)
            .setFooter("Powered by FiresideBOT", bot.user.avatarURL({ dynamic: true }))

            tracker.guildInfo.forEach(async guild => {
                if(!bot.guilds.resolve(guild.guild_id)) return;
                else if(!bot.guilds.resolve(guild.guild_id).channels.resolve(guild.channel_id)) return console.log("Invalid Channel", guild);

                let role_mention = "";

                // if(process.env.ENVIRONMENT === "DEV" && guild.guild_id !== "427883469092159490") return;
                if(guild.flavor_text && guild.flavor_text !== "")
                    guild.flavor_text = await flavorTextParser(guild.flavor_text, guild, tracker.channelName);
                else if(guild.role_id && guild.role_id === "@everyone") role_mention = "@everyone";
                else if(guild.role_id && guild.role_id === "none") role_mention = " ";
                else if(guild.role_id) role_mention = `<@&${guild.role_id}>`;

                bot.guilds.resolve(guild.guild_id).channels.resolve(guild.channel_id).send(role_mention ? role_mention : guild.flavor_text, embed);
            });
        });
    }
};

module.exports = services;