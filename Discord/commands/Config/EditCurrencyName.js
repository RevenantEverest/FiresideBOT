const currencyDB = require('../../models/currencyDB');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify a new currency name");
    args.splice(0, 1);
    currencyDB.updateCurrencyName({ currency_name: args.join(" "), guild_id: message.guild.id })
    .then(() => message.channel.send(`Server currency name updated to **${args.join(" ")}**`))
    .catch(err => {
        console.error(err);
        message.channel.send('An error has occurred, sorry for the inconvenience');
    });
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