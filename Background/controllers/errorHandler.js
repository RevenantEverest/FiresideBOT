const Discord = require('discord.js');
const moment = require('moment');
const bot = require('../Discord_Bot');

module.exports = async (err) => {
    let embed = new Discord.MessageEmbed();

    embed
    .setColor(0xff3300)
    .setTitle("New Background Process Error")
    if(err.event) embed.addField("Event:", err.event)
    if(err.controller) embed.addField("Controller:", err.controller)
    .addField("Error Message:", err.message)
    .setFooter(moment().format("LLLL") + " EST")

    let channel = await bot.channels.fetch(process.env.ENVIRONMENT === "DEV" ? "624216968844804096" : "624755756079513621");
    if(channel) return channel.send(embed).then(() => console.error(err.error));
    else return console.error(`[${err.message}] => `, err.error);
};