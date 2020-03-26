const settingsDB = require('../models/currencySettingsDB');
const recordsDB = require('../models/currencyRecordsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const defaultSettingsController = require('./defaultSettingsController');

services.removeRecord = async (member) => {
    discordCurrencyDB.delete(member.id)
    .catch(err => console.error(err));
};

services.handleCurrency = async (message) => {
    let currencyInfo = {};
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRecord(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            defaultSettingsController.saveDefaultCurrencySettings(message.guild.id, getRecord);
        else console.error(err);
    });

    async function getRecord(settings) {
        currencyInfo.settings = settings;
        recordsDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
        .then(record => updateRecord(record))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                recordsDB.save({ currency: 0, discord_id: message.author.id, guild_id: message.guild.id })
                .then(record => updateRecord(record))
                .catch(err => console.error(err));
            else console.error(err);
        });
    };

    async function updateRecord(record) {
        let { currency_increase_rate } = currencyInfo.settings;
        let updatedCurrency = parseInt(record.currency, 10) + currency_increase_rate;
        recordsDB.update({ currency: updatedCurrency.toString(), discord_id: message.author.id, guild_id: message.guild.id })
        .catch(err => console.error(err));
    };
};

module.exports = services;