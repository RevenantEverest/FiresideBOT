const quotes = require('../utils/utils').thanosQuotes;

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
};

module.exports.config = {
    name: 'thanos',
    d_name: 'Thanos',
    aliases: [],
    category: 'Fun',
    desc: 'Displays a random Thanos quote',
    example: 'thanos'
};