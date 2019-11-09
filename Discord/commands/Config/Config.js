const Discord = require('discord.js');

const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');
const currencyController = require('../../controllers/dbControllers/currencyController');
const welcomeMessageController = require('../../controllers/dbControllers/welcomeMessageController');
const rankSettingsController = require('../../controllers/dbControllers/rankSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let logSettings = null;
    let welcomeMessage = null;
    let currencySettings = null;
    let rankSettings = null;

    logSettingsController.getByGuildId(bot, message, "Config", message.guild.id, getWelcomeMessage, () => getWelcomeMessage({ enabled: false, channel_id: 'none' }));

    async function getWelcomeMessage(lSettings) {
        logSettings = lSettings;
        welcomeMessageController.getByGuildId(bot, message, "Config", message.guild.id, getCurrencySettings, () => getCurrencySettings(false))
    };

    async function getCurrencySettings(wMessage) {
        welcomeMessage = wMessage;
        currencyController.getCurrencySettings(bot, message, "Config", message.guild.id, getRankSettings, () => {
            let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
            currencyController.saveDefaultSettings(bot, message, "Config", data, getRankSettings);
        });
    };

    async function getRankSettings(cSettings) {
        currencySettings = cSettings;
        rankSettingsController.getByGuildId(bot, message, "Config", message.guild.id, sendEmbed, () => {
            let data = { guild_id: message.guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" };
            rankSettingsController.save(bot, message, "Config", data, sendEmbed);
        });
    };

    async function sendEmbed(rSettings) {
        rankSettings = rSettings;
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
            `**Name**: ${currencySettings.currency_name}\n` +
            `**Increase Rate**: ${currencySettings.currency_increase_rate}\n\n\n\n` +
    
            `**RANKS**\n\n` +
            `**Complexity**: ${rankSettings.complexity}\n` +
            `**General Increase Rate**: ${rankSettings.general_increase_rate}\n` +
            `**Level Up Channel**: ${rankSettings.channel_id === "none" ? "none" : `<#${rankSettings.channel_id}>`}`
        )
    
        message.channel.send(embed);
    };
};

module.exports.config = {
    name: 'config',
    d_name: 'Config',
    aliases: [],
    category: 'Config',
    desc: 'Configure FiresideBOT',
    example: 'config'
};