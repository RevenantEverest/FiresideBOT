const Discord = require('discord.js');
const discordCurrencyDB = require('../../models/discordCurrencyDB');
const currencyDB = require('../../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

function saveCurrencySettings(settings, message, embed) {
    discordCurrencyDB.save({ discord_id: message.author.id, guild_id: message.guild.id, currency: 0 })
        .then(userCurrency => {
            embed
            .addField("Bank Records For:", `${message.author.username}`, true)
            .addField("Server: ", `${message.guild.name}`, true)
            .addBlankField()
            .addField(`${settings.currency_name}:`, `${userCurrency.currency}`)
            .setThumbnail('https://i.imgur.com/PzZmx1l.png')
            message.channel.send(embed);
        })
        .catch(err => console.log(err));
};

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let currencyEmbed = new Discord.RichEmbed();
    currencyEmbed.setColor(0xff6600);

    let discord_id = message.author.id;
    let guild_id = message.guild.id;

    currencyDB.findCurrencySettings(guild_id)
        .then(settings => {
            discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id })
                .then(userCurrency => {
                    currencyEmbed
                    .addField("Bank Records For:", `${message.author.username}`, true)
                    .addField("Server: ", `${message.guild.name}`, true)
                    .addBlankField()
                    .addField(`${settings.currency_name}:`, `${userCurrency.currency}`)
                    .setThumbnail('https://i.imgur.com/PzZmx1l.png')
                    message.channel.send(currencyEmbed);
                })
                .catch(err => {
                    if(err instanceof QRE && err.code === qrec.noData) {
                        saveCurrencySettings(settings, message, currencyEmbed);
                    }else console.error(err);
                })
        })
        .catch(err => console.error(err));
    
};

module.exports.config = {
    name: 'balance',
    d_name: 'Balance',
    aliases: ['bal'],
    params: { required: false, optional: false, params: '' },
    category: ['economy', 'Economy'],
    desc: 'Displays currenct balance for Server'
};