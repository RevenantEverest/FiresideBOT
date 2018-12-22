module.exports.run = async (PREFIX, message, args, server, bot) => {
    message.channel.send("Pong");
};

module.exports.config = {
    name: 'ping',
    aliases: ['p']
}