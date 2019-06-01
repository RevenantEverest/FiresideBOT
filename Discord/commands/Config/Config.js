const Discord = require('discord.js');
const settingsDB = require('../../models/settingsDB');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let embed = new Discord.RichEmbed();
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => {
        embed
        .setThumbnail(message.guild.iconURL)
        .setColor(0x737373)
        .addField("Config", 
            `**Prefix**: ${PREFIX}\n\n\n\n` +

            `**CURRENCY**\n\n` +
            `**Name**: ${settings.currency_name}\n` +
            `**Increase Rate**: ${settings.currency_increase_rate}\n\n\n\n` +

            `**RANKS**\n\n` +
            `**Complexity**: ${settings.complexity}\n` +
            `**General Increase Rate**: ${settings.general_increase_rate}\n` +
            `**Level Up Channel**: ${settings.channel_id === "none" ? "none" : `<#${settings.channel_id}>`}`

        )

        message.channel.send(embed);
    })
    .catch(err => console.error(err));
};

module.exports.config = {
    name: 'config',
    d_name: 'Config',
    aliases: [],
    category: 'Config',
    desc: 'Configure FiresideBOT',
    example: 'config'
}