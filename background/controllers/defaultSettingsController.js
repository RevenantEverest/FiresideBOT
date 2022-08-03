const guildSettingsDB = require('../models/guildSettingsDB');
const currencySettingsDB = require('../models/currencySettingsDB');
const rankSettingsDB = require('../models/rankSettingsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('./errorHandler');

services.saveDefaultRankSettings = async (guild_id, callback) => {
    rankSettingsDB.save({ guild_id: guild_id, general_increase_rate: 10, complexity: 2, channel_id: "none" })
    .then(rankSettings => callback(rankSettings))
    .catch(err => errorHandler({ controller: "Default Settings Controller", message: "Error Saving Rank Settings", error: err }));
};

services.saveDefaultCurrencySettings = async (guild_id, callback) => {
    currencySettingsDB.save({ guild_id: guild_id, currency_name: "kindling", currency_increase_rate: 10 })
    .then(currencySettings => callback(currencySettings))
    .catch(err => errorHandler({ controller: "Default Settings Controller", message: "Error Saving Currency Settings", error: err }));
};

services.saveDefaultGuildSettings = async (guild_id, callback) => {
    guildSettingsDB.save({ guild_id: guild_id, prefix: "?", volume: 50 })
    .then(guildSettings => callback(guildSettings))
    .catch(err => errorHandler({ controller: "Default Settings Controller", message: "Error Saving Guild Settings", error: err }));
};

services.checkDefaultSettings = async (guild_id, callback) => {
    guildSettingsDB.findByGuildId(guild_id)
    .then(() => checkCurrencySettings())
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            services.saveDefaultGuildSettings(guild_id, checkCurrencySettings);
        else errorHandler({ controller: "Default Settings Controller", message: "Error Finding Guild Settings", error: err });
    })

    async function checkCurrencySettings() {
        currencySettingsDB.findByGuildId(guild_id)
        .then(() => checkRankSettings())
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                services.saveDefaultCurrencySettings(guild_id, checkRankSettings);
            else errorHandler({ controller: "Default Settings Controller", message: "Error Finding Currency Settings", error: err });
        });
    };

    async function checkRankSettings() {
        rankSettingsDB.findByGuildId(guild_id)
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                services.saveDefaultRankSettings(guild_id, () => { 
                    return console.log("[Log] Default Settings Saved"); 
                });
            else errorHandler({ controller: "Default Settings Controller", message: "Error Finding Rank Settings", error: err });
        });
    }
};

module.exports = services;