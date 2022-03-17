const Discord = require('discord.js');
const { time } = require("../../utils");

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let uptimeSeconds = Math.floor(bot.uptime / 1000);
    let uptime = await time.timeParser(uptimeSeconds, true);
    let embed = new Discord.MessageEmbed();

    embed
    .setColor(0xcc99ff)
    .setDescription(`<:Clock:597297238246424576> **Uptime**: ${uptime}`)

    message.channel.send(embed);
};

module.exports.config = {
    name: 'uptime',
    d_name: 'Uptime',
    aliases: [],
    category: 'Other',
    desc: 'Uptime',
    example: 'uptime'
};