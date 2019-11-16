const Discord = require('discord.js');
const discordCurrencyController = require('../../controllers/dbControllers/discordCurrencyController');
const currencyController = require('../../controllers/dbControllers/currencyController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let cSettings = null;
    currencyController.getCurrencySettings(bot, message, "Balance", message.guild.id, handleCurrencyRecords, () => {
        let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
        currencyController.saveDefaultSettings(bot, message, "Balance", data, handleCurrencyRecords);
    });

    async function handleCurrencyRecords(settings) {
        cSettings = settings;
        let data = { discord_id: message.author.id, guild_id: message.guild.id };
        discordCurrencyController.getByDiscordIdAndGuildId(bot, message, "Balance", data, (record) => sendEmbed(settings, record), () => {
            let data = { discord_id: message.author.id, guild_id: message.guild.id, currency: 0 }
            discordCurrencyController.save(bot, message, "Balance", data, (record) => sendEmbed(settings, record));
        });
    };

    async function sendEmbed(settings, userCurrency) {
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
};

module.exports.config = {
    name: 'balance',
    d_name: 'Balance',
    aliases: ['bal'],
    category: 'Economy',
    desc: 'Displays currenct balance for Server',
    example: 'balance'
};