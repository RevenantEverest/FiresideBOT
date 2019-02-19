const fortunes = require('../utils/fortunes');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    else message.channel.send("Ask a question.");
};

module.exports.config = {
    name: '8ball',
    d_name: '8Ball',
    aliases: ['eightball', 'fortune'],
    params: { required: true, optional: false, params: 'Question' },
    category: ['fun', 'Fun'],
    desc: 'Returns a Yes or No style response'
};