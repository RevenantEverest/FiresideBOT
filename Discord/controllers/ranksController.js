const Discord = require('discord.js');
const recordsDB = require('../models/discordRankRecordsDB');
const ranksDB = require('../models/discordRanksDB');
const settingsDB = require('../models/discordRankSettingsDB');
const utils = require('../commands/utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getSettings(bot, message, ranks) {
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => checkForRecord(bot, message, ranks, settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            saveDefaultSettings(bot, message, ranks);
        else console.error(err);
    })
};

async function saveDefaultSettings(bot, message, ranks) {
    settingsDB.save({ guild_id: message.guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" })
    .then(settings => checkForRecord(bot, message, ranks, settings))
    .catch(err => console.error(err));
};

async function checkForRecord(bot, message, ranks, settings) {
    recordsDB.findByDiscordIdAndGuildId({discord_id: message.author.id, guild_id: message.guild.id})
    .then(record => checkForLevelUp(bot, message, ranks, settings, record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            createRecord(bot, message, ranks, settings);
        else console.error(err);
    });
};

async function createRecord(bot, message, ranks, settings) {
    recordsDB.save({ guild_id: message.guild.id, discord_id: message.author.id, xp: settings.general_increase_rate })
    .then(record => checkForLevelUp(bot, message, ranks, settings, record))
    .catch(err => console.error(err));
};

async function updateRecord(bot, message, ranks, settings, record, levelUp) {
    recordsDB.update({ id: record.id, guild_id: record.guild_id, discord_id: record.discord_id, xp: (parseInt(settings.general_increase_rate, 10) + parseInt(record.xp, 10)) })
    .then(uRecord => {
        if(levelUp) return sendLevelUp(bot, message, ranks, settings, uRecord);
    })
    .catch(err => console.error(err));
};

async function checkForLevelUp(bot, message, ranks, settings, record) {
    let currentLevel = await utils.calculateLevel(settings.complexity, parseInt(record.xp, 10));
    let xpUpdate = await utils.calculateLevel(settings.complexity, (parseInt(record.xp, 10) + parseInt(settings.general_increase_rate, 10)));

    let levelUp = false;
    if(currentLevel < xpUpdate && ranks.length >= xpUpdate) levelUp = true;
    if(currentLevel > ranks.length) return;

    updateRecord(bot, message, ranks, settings, record, levelUp);
};

async function sendLevelUp(bot, message, ranks, settings, uRecord) {
    let Level = await utils.calculateLevel(settings.complexity, (parseInt(uRecord.xp, 10) + parseInt(settings.general_increase_rate, 10)));
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0x66ff33)
    .addField("Level Up!", `<@${uRecord.discord_id}> is now Level: ${Level}`)

    settings.channel_id === "none" ? message.channel.send(embed) : bot.channels.get(settings.channel_id).send(embed);
};

module.exports = {
    handleXP(bot, message) {
        ranksDB.findByGuildId(message.guild.id)
        .then(ranks => getSettings(bot, message, ranks))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) return;
            else console.error(err);
        })
    }
};