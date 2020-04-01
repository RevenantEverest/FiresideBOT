const Discord = require('discord.js');
const recordsDB = require('../models/rankRecordsDB');
const ranksDB = require('../models/rankTiersDB');
const settingsDB = require('../models/rankSettingsDB');
const defaultSettingsController = require('./defaultSettingsController');
const utils = require('../utils/utils');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.deleteRankRecord = async (member) => {
    recordsDB.deleteByDiscordId(member.user.id)
    .catch(err => console.error(err));
};

services.handleEXP = async (bot, message) => {
    let rankInfo = {};

    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => getRankSettings(ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });

    async function getRankSettings(ranks) {
        rankInfo.tiers = ranks;

        settingsDB.findByGuildId(message.guild.id)
        .then(settings => checkForRecord(settings))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                defaultSettingsController.saveDefaultRankSettings(message.guild.id, checkForRecord);
            else console.error(err);
        });
    };

    async function checkForRecord(settings) {
        rankInfo.settings = settings;

        recordsDB.findByDiscordIdAndGuildId({discord_id: message.author.id, guild_id: message.guild.id})
        .then(record => checkForLevelUp(record))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                recordsDB.save({ guild_id: message.guild.id, discord_id: message.author.id, xp: rankInfo.settings.general_increase_rate })
                .then(record => checkForLevelUp(record))
                .catch(err => console.error(err));
            else console.error(err);
        });
    };

    async function checkForLevelUp(record) {
        rankInfo.record = record;

        let { complexity, general_increase_rate } = rankInfo.settings;
        let currentLevel = await utils.calculateLevel(complexity, parseInt(record.xp, 10));
        let xpUpdate = await utils.calculateLevel(complexity, (parseInt(record.xp, 10) + parseInt(general_increase_rate, 10)));

        let levelUp = false;
        if(currentLevel < xpUpdate && rankInfo.tiers.length >= xpUpdate) levelUp = true;
        if(currentLevel > rankInfo.tiers.length) return;

        updateRecord(levelUp);
    };

    async function updateRecord(levelUp) {
        let { id, guild_id, discord_id, xp } = rankInfo.record;
        recordsDB.update({ id: id, guild_id: guild_id, discord_id: discord_id, xp: (parseInt(rankInfo.settings.general_increase_rate, 10) + parseInt(xp, 10)) })
        .then(uRecord => {
            if(levelUp) return sendLevelUpEmbed(uRecord);
        })
        .catch(err => console.error(err));
    };

    async function sendLevelUpEmbed(uRecord) {
        let { complexity, general_increase_rate, channel_id } = rankInfo.settings;
        let Level = await utils.calculateLevel(complexity, (parseInt(uRecord.xp, 10) + parseInt(general_increase_rate, 10)));
        let embed = new Discord.RichEmbed();

        embed
        .setColor(0x66ff33)
        .addField("Level Up!", `<@${uRecord.discord_id}> is now Level: ${Level}`)

        channel_id === "none" ? message.channel.send(embed) : bot.channels.get(channel_id).send(embed);
    };
};

module.exports = services;