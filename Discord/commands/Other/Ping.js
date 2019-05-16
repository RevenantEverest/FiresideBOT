module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    message.channel.send("Pong");
};

module.exports.config = {
    name: 'ping',
    d_name: 'Ping',
    aliases: [],
    category: 'Other',
    desc: 'Pong'
};