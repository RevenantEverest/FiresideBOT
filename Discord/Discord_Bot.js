const config = require('../config/config');
const Discord_Bot = new config.Discord.Client();
const Discord_Commands = require('./commands/Discord_Commands');
const guildsDB = require('../models/GuildModels/guildsDB');
const customCommandsDB = require('../models/customCommandsDB');
const currency = require('./commands/currency/currency');
const discordCurrencyDB = require('../models/discordCurrencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;
let PREFIX = '';

// Called When Bot Starts
Discord_Bot.on("ready", () => {
});


// Called When Bot Joins Guild
Discord_Bot.on("guildCreate", (guild) => {
  guildsDB.save({ guild_name: guild.name, guild_id: guild.id })
    .then(() => {
      guildsDB.ifSettingsExist(guild.id)
        .then(settings => {
          if(settings.count === "1") {
            discordCurrencyDB.findCurrencySettings(guild.id)
              .then()
              .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData) {
                  discordCurrencyDB.saveDefaultSettings({
                    guild_id: guild.id,
                    currency_name: 'Kindling',
                    currency_increase_rate: 10
                  })
                  .catch(err => console.log(err));
                }
                else console.log(err);
              });
          }
          else if(settings.count === "0") {
            guildsDB.saveDefaultSettings({
              guild_id: guild.id,
              prefix: '?'
            })
            .then(() => {
              discordCurrencyDB.findCurrencySettings(guild.id)
                .then()
                .catch(err => {
                  if(err instanceof QRE && err.code === qrec.noData) {
                    discordCurrencyDB.saveDefaultSettings({
                      guild_id: guild.id,
                      currency_name: 'Kindling',
                      currency_increase_rate: 10
                    })
                    .catch(err => console.log(err));
                  }
                  else console.log(err);
                })
            })
            .catch(err => {
              console.log(err);
            })
          }
        })
    }).catch(err => console.log(err));
});

// Called When Bot Get Removed
Discord_Bot.on("guildDelete", (guild) => {
  guildsDB.destroy(guild.id)
    .then().catch(err => console.log(err));
});

// Called Message Is Sent In Guild
Discord_Bot.on("message", (message) => {
  // message.guild.leave();
  if(message.author.equals(Discord_Bot.user)) return;
  if(message.channel.type === 'dm') return;
  currency.handleCurrency(message);
  if(message.channel.type === 'text')
    guildsDB.findPrefix(message.guild.id)
      .then(prefix => {
        PREFIX = prefix.prefix;
        if(!message.content.startsWith(PREFIX)) return;

        let args = message.content.substring(PREFIX.length).split(" ");

        Discord_Commands.commands(message, args);
      })
      .catch(err => console.log(err));
});

module.exports = Discord_Bot;
