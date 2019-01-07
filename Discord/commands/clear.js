module.exports.run = async (PREFIX, message, args, server, bot) => {
    server.queue.queueInfo = [];
    message.channel.send("Queue Cleared.");
};

module.exports.config = {
    name: 'clear',
    d_name: 'Clear',
    aliases: [],
    params: { required: false, optional: false, params: '' },
    category: ['music', 'Music'],
    desc: 'Clears the current queue'
};