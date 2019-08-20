const Discord = require('discord.js');
const discordCurrencyDB = require('../../models/discordCurrencyDB');
const currencyDB = require('../../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function createRecord(settings, message) {
    discordCurrencyDB.save({ discord_id: message.author.id, guild_id: message.guild.id, currency: 0 })
    .then(userCurrency => sendEmbed(message, settings, userCurrency))
    .catch(err => errorHandler(message, err, "Error Creating Currency Record", "Balance"));
};

async function getCurrencyRecord(message, settings) {
    discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
    .then(userCurrency => sendEmbed(message, settings, userCurrency))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            createRecord(settings, message, currencyEmbed);
        else errorHandler(message, err, "Error Finding Currency Record", "Balance");
    })
};

async function sendEmbed(message, settings, userCurrency) {
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xff6600)
    .addField("Bank Records For:", `${message.author.username}`, true)
    .addField("Server: ", `${message.guild.name}`, true)
    .addBlankField()
    .addField(`${settings.currency_name}:`, parseInt(userCurrency.currency, 10).toLocaleString())
    .setThumbnail('https://i.imgur.com/PzZmx1l.png')
    message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    currencyDB.findCurrencySettings(message.guild.id)
    .then(settings => getCurrencyRecord(message, settings))
    .catch(err => errorHandler(message, err, "Error Finding Currency Settings", "Balance"));
    
};

module.exports.config = {
    name: 'balance',
    d_name: 'Balance',
    aliases: ['bal'],
    category: 'Economy',
    desc: 'Displays currenct balance for Server',
    example: 'balance'
};