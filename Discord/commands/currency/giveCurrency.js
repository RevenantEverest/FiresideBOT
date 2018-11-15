const discordCurrencyDB = require('../../../models/discordCurrencyDB');
const currencyDB = require('../../../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  giveCurrency(message, args, server) {
    if(!args[1]) return message.channel.send('Please specify an a recipient and an amount');
    if(!args[2]) return message.channel.send('Please specify an amount to give');
    if(!Number.isInteger(parseInt(args[2], 10))) return message.channel.send('Please specify an integer value to give')
    if(!message.content.split(" ")[1].startsWith('<@')) return message.channel.send('Please specify a valid recipient');

    let discord_id = message.author.id;
    let guild_id = message.guild.id;
    let amountGiven = Math.floor(parseInt(args[2], 10));
    let recipientId = '';
    if(message.content.split(" ")[1].split("<@")[1].split("")[0] === "!")
      recipientId = message.content.split(" ")[1].split("<@!")[1].split(">")[0];
    else recipientId = message.content.split(" ")[1].split("<@")[1].split(">")[0];

    if(discord_id === recipientId) return message.channel.send("You can't give yourself what you already have");
    if(amountGiven <= 0) return message.channel.send("You cant give negative values");

    currencyDB.findCurrencySettings(message.guild.id)
      .then(settings => {
        discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
          .then(results => {
            if(results.currency < amountGiven) return message.channel.send("Not enough points to give");

            // Take currency away
            if(results.currency < amountGiven) return message.channel.send("Not enough points to give");
            let updatedCurrency = parseInt(results.currency, 10) - amountGiven;
            discordCurrencyDB.update({ discord_id: discord_id, guild_id: guild_id, currency: updatedCurrency })
            .then()
            /* Update 1 */
            .catch(err => {
              message.channel.send('An error occured. Take away');
              console.log(err);
            });

            //Give Currency to Recipient
            discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: recipientId, guild_id: guild_id })
            .then(recipientResults => {
              let recipientCurrency = parseInt(recipientResults.currency, 10) + amountGiven;
              discordCurrencyDB.update({ discord_id: recipientId, guild_id: guild_id, currency: recipientCurrency })
                .then(recievedCurrency => {
                  message.channel.send(`${message.mentions.users.array()[0].username} has recieved ${amountGiven} ${settings.currency_name} from ${message.author.username}`);
                })
                /* Update 2 */
                .catch(err => {
                  message.channel.send("An error has occured. Give Update");
                  console.log(err);
                })
            })
            /* findByDiscordIdAndGuildId 2 */
            .catch(err => {
              if(err instanceof QRE && err.code === qrec.noData) {
                message.channel.send("No currency record found.")
              }
              else {
                message.channel.send('An error has occured');
                console.log(err);
              }
            })
          })
          /* findByDiscordIdAndGuildId 1 */
          .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) {
              message.channel.send("No currency to give.")
            }
            else {
              message.channel.send('An error has occured');
              console.log(err);
            }
          })
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          message.channel.send("An error has occured.")
        }
        else {
          message.channel.send('An error has occured');
          console.log(err);
        }
      })
  }
}
