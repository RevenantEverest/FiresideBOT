module.exports.run = async (PREFIX, message, args, server, bot) => {
    server.queue.queueInfo = [];
    message.channel.send("Queue Cleared.");
};

module.exports.config = {
    name: '',
    aliases: [],
    category: [],
    desc: ''
};