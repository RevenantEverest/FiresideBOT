module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    server.queue.queueInfo = [];
    server.queue.genres = [];
    message.channel.send("Queue Cleared.");
};

module.exports.config = {
    name: 'clear',
    d_name: 'Clear',
    aliases: [],
    category: 'Music',
    desc: 'Clears the current queue',
    example: 'clear'
};