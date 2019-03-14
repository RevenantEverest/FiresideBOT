module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    const emojiList = bot.emojis.map(e=>e.toString()).join(" ");
    message.channel.send(emojiList);
};

module.exports.config = {
    name: 'emojis',
    d_name: 'Emojis',
    aliases: [],
    category: 'Other',
    desc: 'Displays the servers custom emojis',
    example: 'emojis'
};