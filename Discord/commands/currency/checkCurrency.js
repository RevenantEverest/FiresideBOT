const config = require('../../../config/config');
const discordCurrencyDB = require('../../../models/discordCurrencyDB');
const currencyDB = require('../../../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  checkCurrency(message, args, server) {
    let currencyEmbed = new config.Discord.RichEmbed();
    currencyEmbed.setColor(0xff6600);

    let discord_id = message.author.id;
    let guild_id = message.guild.id;
    currencyDB.findCurrencySettings(guild_id)
      .then(settings => {
        discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
          .then(results => {
            currencyEmbed
            .addField("Bank Records For:", `${message.author.username}`, true)
            .addField("Server: ", `${message.guild.name}`, true)
            .addBlankField()
            .addField(`${settings.currency_name}:`, `${results.currency}`)
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
                .addField(`${settings.current_name}:`, `${results.currency}`, true)
                .setThumbnail('https://i.imgur.com/PzZmx1l.png')
                message.channel.send(currencyEmbed);
              })
            }
            else {
              console.log(err);
            }
          });
      })
      .catch(err => {
        console.log(err);
      })
  }
};
