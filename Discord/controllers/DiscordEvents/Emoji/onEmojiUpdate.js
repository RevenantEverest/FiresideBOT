const Discord = require('discord.js');

const logSettingsDB = require('../../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, oldEmoji, newEmoji) => {

};