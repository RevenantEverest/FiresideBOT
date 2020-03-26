const guildSettingsDB = require('../models/guildSettingsDB');
const currencySettingsDB = require('../models/currencySettingsDB');
const rankSettingsDB = require('../models/rankSettingsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.saveDefaultRankSettings = async (guild_id, callback) => {
    rankSettingsDB.save({ guild_id: guild_id, general_increase_rate: 10, complexity: 2, channel_id: "none" })
    .then(rankSettings => callback(rankSettings))
    .catch(err => console.error(err));
};

services.saveDefaultCurrencySettings = async (guild_id, callback) => {
    currencySettingsDB.save({ guild_id: guild_id, currency_name: "kindling", currency_increase_rate: 10 })
    .then(currencySettings => callback(currencySettings))
    .catch(err => console.error(err));
};

services.saveDefaultGuildSettings = async (guild_id, callback) => {
    guildSettingsDB.save({ guild_id: guild_id, prefix: "?", volume: 50 })
    .then(guildSettings => callback(guildSettings))
    .catch(err => console.error(err));
};

services.checkDefaultSettings = async (guild_id, callback) => {
    guildSettingsDB.findByGuildId(guild_id)
    .then(() => checkCurrencySettings())
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            this.saveDefaultGuildSettings(guild_id, checkCurrencySettings);
        else console.error(err);
    })

    async function checkCurrencySettings() {
        currencySettingsDB.findByGuildId(guild_id)
        .then(() => checkRankSettings())
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                this.saveDefaultCurrencySettings(guild_id, checkRankSettings);
            else console.error(err);
        });
    };

    async function checkRankSettings() {
        rankSettingsDB.findByGuildId(guild_id)
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                this.saveDefaultRankSettings(guild_id, callback);
            else console.error(err);
        });
    }
};

module.exports = services;