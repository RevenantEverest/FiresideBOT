const Discord = require('discord.js');
const twitchTrackerDB = require('../../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9999).setTitle("Available Trackers")
    twitchTrackerDB.findByGuildId(message.guild.id)
    .then(trackers => {
        let trackerField = '';
        trackers.forEach((el, idx) => trackerField += 
            `${idx + 1}. ${el.twitch_username} <#${el.channel_id}> ` + 
            `${el.role_id === "@everyone" ? "@everyone" : (el.role_id === "none" ? '' : `<@&${el.role_id}>`)} ` +
            `ID: **${el.id}** \n`
        );
        embed.addField("Twitch:", trackerField);
        message.channel.send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            return message.channel.send("No Available Trackers")
        else errorHandler(bot, message, err, "DB Error", "Trackers");
    })
};

module.exports.config = {
    name: "trackers",
    d_name: "Trackers",
    aliases: [],
    category: "Info",
    desc: "Displays available Trackers",
    example: "trackers"
};