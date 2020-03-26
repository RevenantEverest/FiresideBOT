const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let infoEmbed = new Discord.RichEmbed();
    let user = null;
    if(args[1])
        if(args[1].startsWith('<@')) user = bot.users.get(/<@!?(\d+)>/.exec(args.join(" "))[1]);
    let accountCreated = user ? user.createdAt.toString().split(" ") : message.author.createdAt.toString().split(" ");
    user ? user : user = message.author;

    infoEmbed
    .setColor(0xff0066)
    .setThumbnail(user.avatarURL ? user.avatarURL : "https://i.imgur.com/CBCTbyK.png")
    .addField('**User Info**', `${user.username} #${user.discriminator}`)
    .addBlankField()
    .addField('Status:', user.presence.status, true)
    .addField('Game:', (user.presence.game || 'NA'), true)
    .addField('Account Created:', `${accountCreated[1]} ${accountCreated[2]} ${accountCreated[3]}`)
    .setFooter(`ID: ${user.id}`)

    message.channel.send(infoEmbed);
};

module.exports.config = {
    name: 'userinfo',
    d_name: 'UserInfo',
    aliases: ['ui'],
    category: 'Info',
    desc: 'Displays relevant User Info',
    example: 'userinfo'
};