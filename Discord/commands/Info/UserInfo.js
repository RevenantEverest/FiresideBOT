const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let infoEmbed = new Discord.RichEmbed();

    let accountCreated = message.author.createdAt.toString().split(" ");

    infoEmbed
    .setColor(0xff0066)
    .setThumbnail(message.author.avatarURL)
    .addField('**User Info**', `${message.author.username}#${message.author.discriminator}`)
    .addBlankField()
    .addField('Account Created:', `${accountCreated[1]} ${accountCreated[2]} ${accountCreated[3]}`)
    .addField('Status:', message.author.presence.status, true)
    .addField('Game:', (message.author.presence.game || 'NA'), true)

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