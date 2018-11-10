const discordCurrencyDB = require('../../../models/discordCurrencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  handleCurrency(message) {
    // Check if user has points
    let discord_id = message.author.id;
    let guild_id = message.guild.id;
    discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
      .then(results => {
        // TODO: Update currency row based on increase rate in settings
        discordCurrencyDB.findCurrencySettings(guild_id)
          .then(settings => {
            let updatedCurrency = parseInt(results.currency, 10) + parseInt(settings.currency_increase_rate, 10);
            discordCurrencyDB.update({
              discord_id: discord_id,
              guild_id: guild_id,
              currency: updatedCurrency
            })
            .catch(err => {
              message.channel.send("An error has occured.");
              console.log(err);
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        // If User has no previously recorded points, create SQL row
        if(err instanceof QRE && err.code === qrec.noData) {
          discordCurrencyDB.save({
            discord_id: discord_id,
            guild_id: guild_id,
            currency: 0
          })
        }
        else console.log(err);
      });
  }
}
