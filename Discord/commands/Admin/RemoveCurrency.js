const Discord = require('discord.js');
const currencyController = require('../../controllers/dbControllers/discordCurrencyController');
const currencySettingsController = require('../../controllers/dbControllers/currencyController');
const logsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1] || !args[2]) return message.channel.send("Please specify an amount to give and a user to take it from.");

    let recipient_id = /<@!?(\d+)>/.exec(args.join(" "))[1];;
    let amount = null;
    let cSettings = null;

    if(!recipient_id) return message.channel.send("Please tag a user to remove currency from.");

    args.splice(args.indexOf(`<@!${recipient_id}>`), 1);

    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Amount specified isn't an integer.");
    else amount = parseInt(args[1], 10);

    let data = { discord_id: recipient_id, guild_id: message.guild.id };
    currencySettingsController.getCurrencySettings(bot, message, "RemoveCurrency", message.guild.id, getRecord, () => {
        return message.channel.send("No default Currency Settings");
    })

    async function getRecord(settings) {
        cSettings = settings;
        currencyController.getByDiscordIdAndGuildId(bot, message, "RemoveCurrency", data, updateRecord, () => {
            return message.channel.send("No Currency Record Found");
        });
    };

    async function updateRecord(record) {
        data.currency = parseInt(record.currency, 10) - amount;
        if(data.currency < 0) data.currency = 0;
        currencyController.update(bot, message, "RemoveCurrency", data, () => {
            message.channel.send(
                `<@${recipient_id}> has had **${amount.toLocaleString()}** **${cSettings.currency_name}** taken from them by <@${message.author.id}>`
            );
            logsController.getByGuildId(bot, message, "RemoveCurrency", message.guild.id, postLog, () => { return; });
        });
    };

    async function postLog(settings) {
        let embed = new Discord.MessageEmbed();
        let recipient = bot.users.cache.get(recipient_id);

        embed
        .setColor(0xff0000)
        .setAuthor(
            `${message.author.username} #${message.author.discriminator} removed currency`,
            message.author.avatarURL({ dynamic: true })
        )
        .setDescription(`**Recipient:** ${recipient.username} #${recipient.discriminator}\n**Amount Taken:** ${amount.toLocaleString()}`)
        .setThumbnail(recipient.avatarURL({ dynamic: true }))
        .setFooter(`Member ID: ${recipient.id}`)

        bot.channels.resolve(settings.channel_id).send(embed);
    };
};

module.exports.config = {
    name: 'removecurrency',
    d_name: 'RemoveCurrency',
    aliases: ['rc'],
    params: { required: true, params: 'User Tag / Amount' },
    flags: ["-r"],
    category: 'Admin',
    desc: 'Takes away currency from a user',
    example: 'removecurrency @RevenantEverest 1000 -r His memes were bad'
};