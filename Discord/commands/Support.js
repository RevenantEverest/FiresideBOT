module.exports.run = async (PREFIX, message, args, server, bot) => {
    message.channel.send('https://discord.gg/TqKHVUa');
};

module.exports.config = {
    name: 'support',
    d_name: 'Support',
    aliases: [],
    params: {},
    category: ['support', 'Support'],
    desc: 'Sends a link to the Support Discord Server'
}