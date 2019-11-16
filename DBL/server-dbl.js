require('dotenv').config();

const Discord = require('discord.js');
const memwatch = require('node-memwatch');
const Discord_Bot = require('./Discord_Bot');
const utils = require('./utils/utils');

Discord_Bot.login(process.env.DISCORD_KEY);

memwatch.on('leak', async (info) => {
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xcc0000)
    .addField(
        '⚠️ Memory Leak Detected ⚠️', 
        `A memory leak has been detected in the **DBL** Service\n\n` + 
        `**Reason:** ${info.reason}\n\n` +
        `**Growth:** ${info.growth}`
    )
    .setFooter(await utils.getDate())
    Discord_Bot.channels.get("543862697742172179").send(embed);
});

module.exports = require('./app');