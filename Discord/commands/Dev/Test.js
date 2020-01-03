module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    // console.log(message.author.presence.name);

    console.log(message.guild.members.array().map(el => el.presence.game ? el.presence.game.name : null).filter(Boolean))
    // errorHandler(bot, message, "err", "New Error Occurred", "Test")
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};