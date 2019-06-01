module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    message.channel.send("https://discordbots.org/bot/441338104545017878/vote");
};

module.exports.config = {
    name: 'vote',
    d_name: 'Vote',
    aliases: [],
    category: 'Other',
    desc: 'Displays link to Vote for Fireside on DBL',
    example: 'vote'
};