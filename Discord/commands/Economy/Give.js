const discordCurrencyDB = require('../../models/discordCurrencyDB');
const currencyDB = require('../../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

function updateUserCurrency(u_Currency, r_Currency, settings, amountGiven, message) {
    let updatedCurrency = parseInt(u_Currency.currency, 10) - amountGiven;
    discordCurrencyDB.update({ currency: updatedCurrency, discord_id: u_Currency.discord_id, guild_id: message.guild.id })
    .then(() => updateRecipientCurrency(r_Currency, settings, amountGiven, message))
    .catch(err => console.error(err));
};

function updateRecipientCurrency(r_Currency, settings, amountGiven, message) {
    let updatedCurrency = parseInt(r_Currency.currency, 10) + amountGiven;
    discordCurrencyDB.update({ currency: updatedCurrency, discord_id: r_Currency.discord_id, guild_id: message.guild.id })
    .then(() => {
        message.channel.send(`**${message.author.username}** gave **${message.mentions.users.array()[0].username}**, **${amountGiven.toLocaleString()} ${settings.currency_name}**`);
    })
    .catch(err => console.error(err));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify an a recipient and an amount');
    if(!args[2]) return message.channel.send('Please specify an amount to give');
    if(!Number.isInteger(parseInt(args[2], 10))) return message.channel.send('Please specify an integer value to give');
    if(!message.content.split(" ")[1].startsWith('<@')) return message.channel.send('Please specify a valid recipient');
    if(parseInt(args[2], 10)< 1) return message.channel.send('Please specify an amount to give of at least 1 or higher');

    let discord_id = message.author.id;
    let guild_id = message.guild.id;
    let amountGiven = Math.floor(parseInt(args[2], 10));
    let recipient_id = /<@!?(\d+)>/.exec(args.join(" "))[1];

    if(discord_id === recipient_id) return message.channel.send(`You can't give money to yourself`);

    let currencyPromises = [
        discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: discord_id, guild_id: guild_id }),
        discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: recipient_id, guild_id: guild_id })
    ];

    currencyDB.findCurrencySettings(message.guild.id)
        .then(settings => {
            Promise.all(currencyPromises).then(currencyData => {
                if(currencyData[0].currency < amountGiven) return message.channel.send('Insufficient Funds...');

                updateUserCurrency(currencyData[0], currencyData[1], settings, amountGiven, message);
            })
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData) {
                    message.channel.send("No currency record found.")
                }
                else console.error(err);
            })
        })
        .catch(err => console.error(err));
};

module.exports.config = {
    name: 'give',
    d_name: 'Give',
    aliases: [],
    params: { required: true, params: 'Mention / Amount' },
    category: 'Economy',
    desc: 'Gives a currency amount to desired recipient, from your balance',
    example: 'give @YourFavoritePerson 100'
};