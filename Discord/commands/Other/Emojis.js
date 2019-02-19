module.exports.run = async (PREFIX, message, args, server, bot) => {
    const emojiList = bot.emojis.map(e=>e.toString()).join(" ");
    message.channel.send(emojiList);
};

module.exports.config = {
    name: 'emojis',
    d_name: 'Emojis',
    aliases: [],
    params: {},
    category: ['other', 'Other'],
    desc: ''
};