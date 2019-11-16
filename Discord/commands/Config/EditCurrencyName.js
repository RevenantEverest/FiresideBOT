const currencyController = require('../../controllers/dbControllers/currencyController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify a new currency name");
    args.splice(0, 1);

    currencyController.getCurrencySettings(bot, message, "EditCurrencyName", message.guild.id, updateCurrencySettings, () => {
        let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
        currencyController.saveDefaultSettings(bot, message, "EditCurrencyName", data, updateCurrencySettings);
    });

    async function updateCurrencySettings(settings) {
        let data = { guild_id: message.guild.id, currency_name: args.join(" "), currency_increase_rate: settings.currency_increase_rate };
        currencyController.updateSettings(bot, message, "EditCurrencyName", data, (newSettings) => {
            return message.channel.send(`Server currency name updated to **${newSettings.currency_name}**`);
        });
    };
};

module.exports.config = {
    name: 'editcurrencyname',
    d_name: 'EditCurrencyName',
    aliases: ['ecn'],
    params: { required: true, params: "Name" },
    category: 'Config',
    desc: 'Update server currency name',
    example: 'editcurrencyname Souls'
};