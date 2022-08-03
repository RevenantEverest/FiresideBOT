const settingsDB = require('../models/currencySettingsDB');
const recordsDB = require('../models/currencyRecordsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const defaultSettingsController = require('./defaultSettingsController');
const errorHandler = require('./errorHandler');

services.removeRecord = async (member) => {
    recordsDB.delete(member.user.id)
    .catch(err => console.error(err));
};

services.handleCurrency = async (message) => {
    let currencyInfo = {};
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRecord(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            defaultSettingsController.saveDefaultCurrencySettings(message.guild.id, getRecord);
        else errorHandler({ controller: "Currency Controller", message: "Function HandleCurrency", error: err });
    });

    async function getRecord(settings) {
        currencyInfo.settings = settings;
        recordsDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
        .then(record => updateRecord(record))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                recordsDB.save({ currency: 0, discord_id: message.author.id, guild_id: message.guild.id })
                .then(record => updateRecord(record))
                .catch(err => errorHandler({ controller: "Currency Controller", message: "Function SaveRecord Nest", error: err }));
            else errorHandler({ controller: "Currency Controller", message: "Function GetRecord", error: err });
        });
    };

    async function updateRecord(record) {
        let { currency_increase_rate } = currencyInfo.settings;
        let updatedCurrency = parseInt(record.currency, 10) + currency_increase_rate;
        recordsDB.update({ currency: updatedCurrency.toString(), discord_id: message.author.id, guild_id: message.guild.id })
        .catch(err => errorHandler({ controller: "Currency Controller", message: "Function UpdateRecord", error: err }));
    };
};

module.exports = services;