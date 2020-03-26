const Discord = require('discord.js');
const twitchTrackerDB = require('../../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');
const pagination = require('../utils/pagination');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
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
        if(trackers.length > 5) return handlePagination(trackers);
        embed.addField("Twitch:", trackerField);
        message.channel.send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            return message.channel.send("No Available Trackers")
        else errorHandler(bot, message, err, "DB Error", "Trackers");
    });

    async function handlePagination(trackers) {
        let contentArr = [];

        let fieldValue = '';
        let category = 'Available Trackers';
        trackers.forEach((el, idx) => {
            fieldValue += `${idx + 1}. ${el.twitch_username} <#${el.channel_id}> ` + 
            `${el.role_id === "@everyone" ? "@everyone" : (el.role_id === "none" ? '' : `<@&${el.role_id}>`)} ` +
            `ID: **${el.id}** \n`;
            if((idx + 1) % 5 === 0 && idx !== 0) {
                contentArr.push({ category: category, fields: [{ field: "Twitch Trackers", value: fieldValue }] });
                fieldValue = '';
            }
            if(trackers.length - 1 === idx) 
                contentArr.push({ category: category, fields: [{ field: "Twitch Trackers", value: fieldValue }] });
        });

        pagination(message, bot, contentArr, { title: true, color: 0xff9999 });
    };
};

module.exports.config = {
    name: "trackers",
    d_name: "Trackers",
    aliases: [],
    category: "Info",
    desc: "Displays available Trackers",
    example: "trackers"
};