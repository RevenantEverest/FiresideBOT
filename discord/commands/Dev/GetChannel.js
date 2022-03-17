module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    if(args.includes("-id")) return message.channel.send(`${message.channel.id}`);
};

module.exports.config = {
    name: 'getchannel',
    d_name: 'GetChanne',
    aliases: [],
    category: "Dev"
};