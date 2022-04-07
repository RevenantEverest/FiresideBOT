const currencyController = require('../../controllers/dbControllers/currencyController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value');
    if(parseInt(args[1], 10) <= 0) return message.channel.send("Please choose a number higher than 0");

    currencyController.getCurrencySettings(bot, message, "EditCurrencyRate", message.guild.id, updateCurrencySettings, () => {
        let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
        currencyController.saveDefaultSettings(bot, message, "EditCurrencyRate", data, updateCurrencySettings);
    });

    async function updateCurrencySettings(settings) {
        let data = { guild_id: message.guild.id, currency_name: settings.currency_name, currency_increase_rate: parseInt(args[1], 10) };
        currencyController.updateSettings(bot, message, "EditCurrencyRate", data, (newSettings) => {
            return message.channel.send(`Server Currency Increase Rate per message updated to **${newSettings.currency_increase_rate}**`);
        });
    };
};

module.exports.config = {
    name: 'editcurrencyrate',
    d_name: 'EditCurrencyRate',
    aliases: ['ecr', 'ecir'],
    params: { required: true, params: "Number" },
    category: 'Config',
    desc: 'Update server currency rate',
    example: 'editcurrencyrate 20'
};