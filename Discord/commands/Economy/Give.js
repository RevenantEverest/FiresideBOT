const Discord = require('discord.js');
const discordCurrencyController = require('../../controllers/dbControllers/discordCurrencyController');
const currencyController = require('../../controllers/dbControllers/currencyController');
const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('Please specify an a recipient and an amount');
    if(!args[2]) return message.channel.send('Please specify an amount to give');
    if(!/<@!?(\d+)>/.exec(args.join(" "))) return message.channel.send('Please specify a valid recipient');
    if(parseInt(args[2], 10) < 1) return message.channel.send('Please specify an amount to give of at least 1 or higher');

    let recipient_id = /<@!?(\d+)>/.exec(args.join(" "))[1];
    let cSettings = null;
    let userRecord = null;
    let recipientRecord = null;

    args.splice(args.indexOf(`<@!${recipient_id}>`), 1);

    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value to give');
    
    let amountGiven = Math.floor(parseInt(args[1], 10));

    if(message.author.id === recipient_id) return message.channel.send(`You can't give money to yourself`);

    currencyController.getCurrencySettings(bot, message, "Give", message.guild.id, handleUserRecord, () => {
        let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
        currencyController.saveDefaultSettings(bot, message, "Give", data, handleUserRecord);
    });

    async function handleUserRecord(settings) {
        cSettings = settings;
        let data = { discord_id: message.author.id, guild_id: message.guild.id };
        discordCurrencyController.getByDiscordIdAndGuildId(bot, message, "Give", data, handleRecipientRecord, () => {
            let data = { discord_id: message.author.id, guild_id: message.guild.id, currency: 0 };
            discordCurrencyController.save(bot, message, "Give", data, handleUserRecord);
        });
    };

    async function handleRecipientRecord(record) {
        if(record.currency < amountGiven) return message.channel.send('Insufficient Funds...');
        userRecord = record;
        let data = { discord_id: recipient_id, guild_id: message.guild.id };
        discordCurrencyController.getByDiscordIdAndGuildId(bot, message, "Give", data, handleUpdateRecords, () => {
            let data = { discord_id: recipient_id, guild_id: message.author.id, currency: 0 };
            discordCurrencyController.save(bot, message, "Give", data, handleUserRecord);
        });
    };

    async function handleUpdateRecords(record) {
        recipientRecord = record;
        let updatedCurrency = parseInt(userRecord.currency, 10) - amountGiven;
        let userData = { discord_id: userRecord.discord_id, guild_id: message.guild.id, currency: updatedCurrency };
        let recepientData = { discord_id: recipientRecord.discord_id, guild_id: message.guild.id, currency: updatedCurrency };
        discordCurrencyController.update(bot, message, "Give", userData, () => {
            discordCurrencyController.update(bot, message, "Give", recepientData, () => {
                message.channel.send(
                    `${message.author} gave ${message.mentions.users.array()[0]}, ` +
                    `**${amountGiven.toLocaleString()} ${cSettings.currency_name}**`
                );
                logSettingsController.getByGuildId(bot, message, "Give", message.guild.id, sendLogEmbed, () => { return; });    
            });
        });
    };

    async function sendLogEmbed(settings) {
        let embed = new Discord.MessageEmbed();
        let recipient = bot.users.resolve(recipient_id);
        embed
        .setColor(0xff9900)
        .setAuthor(`${message.author.username} #${message.author.discriminator} gave currency`, message.author.avatarURL({ dynamic: true }))
        .setThumbnail(recipient.avatarURL({ dynamic: true }))
        .setDescription(`**Recipient:** ${recipient.username} #${recipient.discriminator}\n**Amount:** ${amountGiven}`)
        .setFooter(`Member ID: ${recipient_id}`)

        bot.channels.resolve(settings.channel_id).send(embed);
    };
};

module.exports.config = {
    name: 'give',
    d_name: 'Give',
    aliases: [],
    params: { required: true, params: '@Mention and Amount' },
    category: 'Economy',
    desc: 'Gives a currency amount to desired recipient, from your balance',
    example: 'give @YourFavoritePerson 100'
};