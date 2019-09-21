const Discord = require('discord.js');
const settingsDB = require('../../models/settingsDB');
const logSettingsDB = require('../../models/GuildModels/guildLogSettingsDB');
const welcomeMessageDB = require('../../models/welcomeMessageDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getLogSettings(bot, message, PREFIX, settings) {
    logSettingsDB.findByGuildId(message.guild.id)
    .then(logSettings => getWelcomeMessage(bot, message, PREFIX, settings, logSettings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            getWelcomeMessage(message, PREFIX, settings, { enabled: false, channel_id: 'none' });
        else errorHandler(bot, message, err, "Error Finding Log Settings", "Config");
    });
};

async function getWelcomeMessage(bot, message, PREFIX, settings, logSettings) {
    welcomeMessageDB.findByGuildId(message.guild.id)
    .then(() => sendEmbed(message, PREFIX, settings, logSettings, true))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            sendEmbed(message, PREFIX, settings, logSettings, false);
        else errorHandler(bot, message, err, "Error Finding Welcome Message", "Config");
    })
};

async function sendEmbed(message, PREFIX, settings, logSettings, welcomeMessage) {
    let embed = new Discord.RichEmbed();
    embed
    .setThumbnail(message.guild.iconURL)
    .setColor(0x737373)
    .addField("**Config**", 
        `**Prefix**: ${PREFIX}\n\n\n\n` +

        `**Welcome Message**: ${welcomeMessage ? "Enabled" : "Disabled"}\n\n\n\n` +

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
    .then(settings => getLogSettings(bot, message, PREFIX, settings))
    .catch(err => errorHandler(bot, message, err, "Error Finding Settings", "Config"));
};

module.exports.config = {
    name: 'config',
    d_name: 'Config',
    aliases: [],
    category: 'Config',
    desc: 'Configure FiresideBOT',
    example: 'config'
};