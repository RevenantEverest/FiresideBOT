const discordCurrencyDB = require('../../../models/discordCurrencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  handleCurrency(message) {
    // Check if user has points
    let discord_id = parseInt(message.author.id, 10);
    let guild_id = parseInt(message.guild.id, 10);
    discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
      .then(results => {
        // TODO: Update currency row based on increase rate in settings
        let updatedCurrency = (parseInt(results.currency, 10)) + 10;
        console.log(updatedCurrency);
        discordCurrencyDB.update({
          discord_id: discord_id,
          guild_id: guild_id,
          currency: updatedCurrency
        })
        .catch(err => message.channel.send("An error has occured."))
      })
      .catch(err => {
        // If User has no previosuly recorded points, create SQL row
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
