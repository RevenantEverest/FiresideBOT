const Discord = require('discord.js');
const settingsDB = require('../../models/settingsDB');
const logSettingsDB = require('../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function sendEmbed(message, PREFIX, settings, logSettings) {
    let embed = new Discord.RichEmbed();
    embed
    .setThumbnail(message.guild.iconURL)
    .setColor(0x737373)
    .addField("**Config**", 
        `**Prefix**: ${PREFIX}\n\n\n\n` +

        `**Server Logging**: ${logSettings.enabled ? 'Enabled' : 'Disabled'} \n` +
        `**Log Channel**: ${logSettings.channel_id === 'none' ? 'None' : `<#${logSettings.channel_id}>`}\n\n\n\n` +

        `**CURRENCY**\n\n` +
        `**Name**: ${settings.currency_name}\n` +
        `**Increase Rate**: ${settings.currency_increase_rate}\n\n\n\n` +

        `**RANKS**\n\n` +
        `**Complexity**: ${settings.complexity}\n` +
        `**General Increase Rate**: ${settings.general_increase_rate}\n` +
        `**Level Up Channel**: ${settings.channel_id === "none" ? "none" : `<#${settings.channel_id}>`}`

    )

    message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => {
        logSettingsDB.findByGuildId(message.guild.id)
        .then(logSettings => sendEmbed(message, PREFIX, settings, logSettings))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                sendEmbed(message, PREFIX, settings, { enabled: false, channel_id: 'none' });
            else console.error(err);
        })
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
};