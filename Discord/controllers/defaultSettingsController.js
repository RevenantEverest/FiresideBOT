const guildSettingsDB = require('../models/GuildModels/guildSettingsDB');
const currencyDB = require('../models/currencyDB');
const rankSettingsDB = require('../models/discordRankSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function saveGuildSettings(guild) {
    guildSettingsDB.save({ guild_id: guild.id, prefix: '?', volume: 50 })
    .catch(err => console.error(err));
};

async function saveCurrencySettings(guild) {
    currencyDB.saveDefaultSettings({ guild_id: guild.id, currency_name: 'Kindling', currency_increase_rate: 10 })
    .catch(err => console.error(err));
};

async function saveRankSettings(guild) {
    rankSettingsDB.save({ guild_id: guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" })
    .catch(err => console.error(err));
};

module.exports = {
    async guildSettingsCheck(guild) {
        guildSettingsDB.findByGuildId(guild.id)
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                saveGuildSettings(guild);
            else console.error(err);
        });
    },
    async currencySettingsCheck(guild) {
        currencyDB.findCurrencySettings(guild.id)
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                saveCurrencySettings(guild);
            else console.error(err);
        });
    },
    async rankSettingsCheck(guild) {
        rankSettingsDB.findByGuildId(guild.id)
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                saveRankSettings(guild);
            else console.error(err);
        })
    }
};