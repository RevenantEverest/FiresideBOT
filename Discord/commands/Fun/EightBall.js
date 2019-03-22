const fortunes = require('../utils/utils').fortunes;

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    else message.channel.send("Ask a question.");
};

module.exports.config = {
    name: '8ball',
    d_name: '8Ball',
    aliases: ['eightball', 'fortune'],
    params: { required: true, params: 'Question' },
    category: 'Fun',
    desc: 'Returns a Yes or No style response',
    example: '8ball Am I a good developer?'
};