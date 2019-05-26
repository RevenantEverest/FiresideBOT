const config = require('../config/config');
const Discord = require('discord.js');
const db = require('../models/twitchTrackerDB');
const twitchServices = require('../services/twitchServices');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function post(bot, trackers, streamStatus) {
    streamStatus.forEach(el => {
        let tracker = trackers.filter(tel => tel.twitch_username === el.channel.name)[0];

        if(config.channelsLive.includes(tracker.twitch_username)) return;
        else config.channelsLive.push(tracker.twitch_username);

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xcc66ff)
        .setThumbnail(el.channel.logo)
        .setTitle(`${el.channel.display_name} is now LIVE`)
        .addBlankField()
        .addField('Title:', el.channel.status, true)
        .addField('Playing:', (el.game ? el.game : "No Game"), true)
        .addField("Click To Watch:", `[Click Me](https://twitch.tv/${el.channel.name})`, true)

        let role_mention = (tracker.role_id === "@everyone" ? "@everyone" : (tracker.role_id === "none" ? '' : `<@&${tracker.role_id}>`));
        bot.guilds.get(tracker.guild_id).channels.get(tracker.channel_id).send(role_mention, embed);
    })
}

module.exports = {
    runCheck(bot) {
        db.findAll()
        .then(trackers => {
            let promises = [];
            trackers.forEach(el => promises.push(twitchServices.getTwitchStreamStatus(el.twitch_username)));
            Promise.all(promises).then(streamStatus => {
                streamStatus = streamStatus.map(el => el.data.stream).filter(el => el !== null);
                if(streamStatus.length >= 1) post(bot, trackers, streamStatus);
            })
            .catch(err => console.error(err));
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) return console.log("No Trackers");
            else console.error(err);
        })
    },
    checkOffline() {
        let promises = [];
        config.channelsLive.forEach(el => promises.push(twitchServices.getTwitchStreamStatus(el)));
        Promise.all(promises).then(streamStatus => {
            streamStatus = streamStatus.map(el => {
                return { twitch_username: el.request.path.split("/")[3].split("?")[0], online: (el.data.stream ? true : false) }
            });
            streamStatus.forEach(el => {
                if(!el.online) config.channelsLive.splice(config.channelsLive.indexOf(el.twitch_username), 1);
            })
        })
        .catch(err => console.error(err));
    }
};