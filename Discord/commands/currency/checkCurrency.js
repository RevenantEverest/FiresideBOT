const config = require('../../../config/config');
const discordCurrencyDB = require('../../../models/discordCurrencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  checkCurrency(message, args, server) {
    let currencyEmbed = new config.Discord.RichEmbed();
    currencyEmbed.setColor(0xff6600);

    let discord_id = parseInt(message.author.id, 10);
    let guild_id = parseInt(message.guild.id, 10);
    discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
      .then(results => {
        currencyEmbed
        .addField("**Bank Records For: **", `${message.author.username}`, true)
        .addField("Server: ", `${message.guild.name}`, true)
        .addBlankField()
        .addField("Currency: ", `${results.currency}`)
        .setThumbnail('https://i.imgur.com/PzZmx1l.png')
        message.channel.send(currencyEmbed);
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          discordCurrencyDB.save({
            discord_id: discord_id,
            guild_id: guild_id,
            currency: 0
          })
          .then(results => {
            currencyEmbed
            .setTitle("**Bank**")
            .addBlankField()
            .addField("Server: ", `${message.guild.name}`, true)
            .addField("Currency: ", `${results.currency}`, true)
            .setThumbnail('https://i.imgur.com/PzZmx1l.png')
            message.channel.send(currencyEmbed);
          })
        }
        else {
          message.channel.send('An error has occured');
          console.log(err);
        }
      });
  }
};
