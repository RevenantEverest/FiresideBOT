const currencyDB = require('../models/currencyDB');
const discordCurrencyDB = require('../models/discordCurrencyDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

function saveCurrencyRecord(message, settings) {
    discordCurrencyDB.save({ currency: 0, discord_id: message.author.id, guild_id: message.guild.id })
    .then(userCurrency => updateCurrency(message, settings, userCurrency))
    .catch(err => console.error(err));
};

function updateCurrency(message, settings, userCurrency) {
    let updatedCurrency = parseInt(userCurrency.currency, 10) + settings.currency_increase_rate;
    discordCurrencyDB.update({ currency: updatedCurrency.toString(), discord_id: message.author.id, guild_id: message.guild.id })
    .catch(err => console.error(err));
};

module.exports = {
    handleCurrency(message) {
        currencyDB.findCurrencySettings(message.guild.id)
            .then(settings => {
                discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
                    .then(userCurrency => {
                        updateCurrency(message, settings, userCurrency);
                    })
                    .catch(err => {
                        if(err instanceof QRE && err.code === qrec.noData)
                            saveCurrencyRecord(message, settings);
                        else console.log(err);
                    })
            })
            .catch(err => console.error(err));
    }
}