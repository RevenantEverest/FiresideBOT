const currencyDB = require('../../models/currencyDB');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value');
    if(parseInt(args[1], 10) <= 0) return message.channel.send("Please choose a number higher than 0");

    currencyDB.updateCurrencyIncreaseRate({ currency_increase_rate: parseInt(args[1], 10), guild_id: message.guild.id })
    .then(() => message.channel.send(`Server currency increase rate updated to **${args[1]}**`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Currency Rate", "EditCurrencyRate"));
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