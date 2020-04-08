const Discord = require('discord.js');

const welcomeMessageController = require('../../controllers/dbControllers/welcomeMessageController');
const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');
const streamerRolesController = require('../../controllers/dbControllers/streamerRolesController');
const currencyController = require('../../controllers/dbControllers/currencyController');
const rankSettingsController = require('../../controllers/dbControllers/rankSettingsController');
const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

const pagination = require('../utils/pagination');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let settingsArr = [];
    let generalSettings = {};
    let author = {text: message.guild.name, image: message.guild.iconURL};

    welcomeMessageController.getByGuildId(bot, message, "Config", message.guild.id, handleWelcomeMessage, () => handleWelcomeMessage(false));

    async function handleWelcomeMessage(welcomeMessageSettings) {
        generalSettings.welcomeMessage = welcomeMessageSettings;
        newMemberMessagesController.getByGuildId(bot, message, "Config", message.guild.id, handleNewMemberMessages, () => {
            handleNewMemberMessages({ enbaled: false });
        });
    };

    async function handleNewMemberMessages(newMemberMessages) {
        generalSettings.newMemberMessages = newMemberMessages;
        streamerRolesController.getByGuildId(bot, message, "Config", message.guild.id, () => handleStreamerRoles());
    }

    async function handleStreamerRoles(streamerRoles) {
        generalSettings.streamerRoles = streamerRoles;
        currencyController.getCurrencySettings(bot, message, "Config", message.guild.id, handleCurrencySettings, () => {
            let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
            currencyController.saveDefaultSettings(bot, message, "Config", data, handleCurrencySettings);
        });
    };

    async function handleCurrencySettings(currencySettings) {
        settingsArr.push({
            id: "currency",
            category: "Currency Config",
            author: author,
            fields: [{
                field: "Settings",
                value: `**Currency Name:** ${currencySettings.currency_name}\n` +
                `**Increase Rate:** ${currencySettings.currency_increase_rate}`
            }]
        });
        rankSettingsController.getByGuildId(bot, message, "Config", message.guild.id, handleRankSettings, () => {
            let data = { guild_id: message.guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" };
            rankSettingsController.save(bot, message, "Config", data, handleRankSettings);
        });
    };

    async function handleRankSettings(rankSettings) {
        settingsArr.push({
            id: "ranks",
            category: "Ranks Config",
            author: author,
            fields: [{
                field: "Settings",
                value: `**General Increase Rate:** ${rankSettings.general_increase_rate}\n` +
                `**Complexity:** ${rankSettings.complexity}\n` +
                `**Posting Channel:** ${rankSettings.channel_id === "none" ? "none" : `<#${rankSettings.channel_id}>`}`
            }]
        });

        logSettingsController.getByGuildId(bot, message, "Config", message.guild.id, handleLogSettings, () => {
            handleLogSettings({ enabled: false, channel_id: "none" });
        });
    };

    async function handleLogSettings(logSettings) {
        settingsArr.push({
            id: "server logging",
            category: "Server Logging Config",
            author: author,
            fields: [{
                field: "Settings",
                value: `**Enabled:** ${logSettings.enabled ? "Enabled" : "Disabled"}\n` +
                `**Posting Channel:** ${logSettings.channel_id === "none" ? "none" : `<#${logSettings.channel_id}>`}\n\n` + 
                `**Member Role Change:** ${logSettings.member_role_change ? "Enabled" : "Disabled"}\n` +
                `**Member Nickname Change:** ${logSettings.member_nickname_change ? "Enabled" : "Disabled"}\n\n` +
                `**Emoji Create:** ${logSettings.emoji_create ? "Enabled" : "Disabled"}\n` +
                `**Emoji Update:** ${logSettings.emoji_update ? "Enabled" : "Disabled"}\n` +
                `**Emoji Delete:** ${logSettings.emoji_delete ? "Enabled" : "Disabled"}\n\n` +
                `**Role Create:** ${logSettings.role_create ? "Enabled" : "Disabled"}\n` +
                `**Role Update:** ${logSettings.role_update ? "Enabled" : "Disabled"}\n` +
                `**Role Delete:** ${logSettings.role_delete ? "Enabled" : "Disabled"}\n\n`
            }]
        });

        generalSettingsParser();
    };

    async function generalSettingsParser() {
        let temp = {
            id: "general",
            category: "General Config",
            author: author,
            fields: [{
                field: "Settings",
                value: `**Prefix:** ${PREFIX}\n\n` +
                `**New Member Messages:** ${generalSettings.newMemberMessages.enabled ? "Enabled" : "Disabled"}\n` +
                `**Welcome Message:** ${generalSettings.welcomeMessage ? "Enabled" : "Disabled"}\n` +
                `**Streamer Role:** ${generalSettings.streamerRoles ? "Enabled" : "Disabled"}`
            }]
        };
        settingsArr.splice(0, 0, temp);
        if(args[1]) return handleCategory();
        else return handlePagination();
    };

    async function handleCategory() {
        let settingsCategories = settingsArr.map(el => el.id);
        args.splice(0, 1);
        if(!settingsCategories.includes(args.join(" ").toLowerCase())) return message.channel.send("Invalid Config Category");

        let category = settingsArr.filter(el => el.id === args.join(" ").toLowerCase())[0];
        let embed = new Discord.RichEmbed();

        console.log(category)
        embed
        .setColor(0xff3300)
        .setTitle(category.category)
        .setAuthor(author.text, author.image)
        .addField(category.fields[0].field, category.fields[0].value)

        message.channel.send(embed);
    };

    async function handlePagination() {
        let contentArr = [];

        contentArr.push({
            category: "Fireside Config",
            author: author,
            fields: [
                {field: "Configuration Categories", value: "General **|** Currency **|** Ranks **|** Server Logging"},
                {field: "How To Use", value: "Use the reactions below to move back and forth through the menu", inline: true},
                {
                    field: "More Info", 
                    value: "To get more info about a category, use the **config** command again with the desired category name\nExample: " + PREFIX + "config Currency"
                }
            ]
        });

        settingsArr.forEach(el => contentArr.push(el));
        pagination(message, bot, contentArr, {title: true, color: 0xff3300});
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