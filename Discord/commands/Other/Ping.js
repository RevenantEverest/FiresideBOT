module.exports.run = async (PREFIX, message, args, server, bot) => {
    message.channel.send("Pong");
};

module.exports.config = {
    name: 'ping',
    d_name: 'Ping',
    aliases: ['p'],
    params: { required: false, optional: false, params: '' },
    category: ['other', 'Other'],
    basic_desc: 'Pong',
    desc: 'AE'
}