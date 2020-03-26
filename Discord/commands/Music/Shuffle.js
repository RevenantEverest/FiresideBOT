const utils = require('../utils/utils');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    server.queue.queueInfo = await utils.shuffle(server.queue.queueInfo);
    return message.channel.send("Queue shuffled");
};

module.exports.config = {
    name: 'shuffle',
    d_name: 'Shuffle',
    aliases: [],
    category: 'Music',
    desc: 'Shuffles the current Queue',
    example: 'shuffle'
};