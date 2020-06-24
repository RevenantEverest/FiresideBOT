const quotes = require('../utils/utils').thanosQuotes;

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    message.channel.send("<:Thanos:725130467401138186> " + quotes[Math.floor(Math.random() * quotes.length)]);
};

module.exports.config = {
    name: 'thanosquote',
    d_name: 'ThanosQuote',
    aliases: ["tq"],
    category: 'Fun',
    desc: 'Displays a random Thanos quote',
    example: 'thanosquote'
};