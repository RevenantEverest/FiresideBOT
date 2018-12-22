const guildsDB = require('../../models/GuildModels/guildsDB');
const currencyDB = require('../../models/currencyDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    saveGuild(guild) {
        guildsDB.save({ guild_name: guild.name, guild_id: guild.id })
            .then(() => this.guildSettingsCheck(guild))
            .catch(err => {
                //Log Error
                console.log(err);
            });
    },
    guildSettingsCheck(guild) {
        guildsDB.ifSettingsExist(guild.id)
            .then(() => this.currencySettingsCheck(guild))
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData)
                    this.saveDefaultGuildSettings(guild)
                else console.log(err);
            });
    },
    saveDefaultGuildSettings(guild) {
        guildsDB.saveDefaultSettings({ guild_id: guild.id, prefix: '?' })
            .then(() => this.currencySettingsCheck(guild))
            .catch(err => {
                //Log Error
                console.log("Hello", err);
            });
    },
    currencySettingsCheck(guild) {
        currencyDB.findCurrencySettings(guild.id)
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData) {
                    this.saveDefaultCurrencySettings(guild)
                }
                else console.log("Hello World => ", err);
            });
    },
    saveDefaultCurrencySettings(guild) {
        currencyDB.saveDefaultSettings({
            guild_id: guild.id,
            currency_name: 'Kindling',
            currency_increase_rate: 10
        })
            .catch(err => {
                //Log Error
                console.log("SaveDefaultCurrencySettings");
            });
    },
    removeGuild(guild) {
        guildsDB.destroy(guild.id)
            .catch(err => {
                //Log Error
                console.log(err);
            });
    }
}
