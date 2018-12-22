const fortunes = require('./utils/fortunes');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    else message.channel.send("Ask a question.");
};

module.exports.config = {
    name: '8ball',
    aliases: ['eightball', 'fortune'],
    category: ['fun', 'Fun'],
    desc: ''
};