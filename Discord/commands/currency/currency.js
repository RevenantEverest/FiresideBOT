const discordCurrencyDB = require('../../../models/discordCurrencyDB');
const currencyDB = require('../../../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const services = {};

services.handleCurrency = (message) => {
  let discord_id = message.author.id;
  let guild_id = message.guild.id;
  services.getUserCurrency(message, guild_id);
};

services.getUserCurrency = (message, discord_id, guild_id) => {
  discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
    .then(userCurrency => {
      services.getCurrencySettings(message, discord_id, guild_id, userCurrency);
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData) {
        discordCurrencyDB.save({
          discord_id: discord_id,
          guild_id: guild_id,
          currency: 0
        })
      }
      else console.log(err);
    })
};

services.getCurrencySettings = (message, discord_id, guild_id, userCurrency) => {
  currencyDB.findCurrencySettings(guild_id)
  .then(settings => {
    let updatedCurrency = parseInt(userCurrency.currency, 10) + parseInt(settings.currency_increase_rate, 10);
    services.updateUserCurrency(message, discord_id, guild_id, updatedCurrency);
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData) {
      currencyDB.saveDefaultSettings({
        guild_id: guild_id,
        currency_name: 'Kindling',
        currency_increase_rate: 10
      })
      .catch(err => console.log(err));
    }
    else console.log(err);
  })
};

services.updateUserCurrency = (message, discord_id, guild_id, updatedCurrency) => {
  discordCurrencyDB.update({ discord_id: discord_id, guild_id: guild.id, currency: updatedCurrency })
    .catch(err => {
      console.log(err);
    })
};

module.exports = services;
