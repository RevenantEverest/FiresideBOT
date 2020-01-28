const Discord = require('discord.js');
const config = require('../../config/config');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let infoEmbed = new Discord.RichEmbed();

    let accountCreated = bot.user.createdAt.toString().split(" ");

    infoEmbed
    .setColor(0xff0066)
    .setThumbnail(bot.user.avatarURL)
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .addBlankField()
    .addField('Users:', config.environment.users.toLocaleString(), true)
    .addField('Guilds:', bot.guilds.array().length.toLocaleString(), true)
    .addField('Commands:', bot.commands.array().length.toLocaleString(), true)
    .addField('Version:', config.environment.version, true)
    .addField('Created:', `${accountCreated[1]} ${accountCreated[2]} ${accountCreated[3]}`, true)
    .addBlankField()
    .addField("Resources", '[Website](https://firesidebot.com) | [Support Server](https://discord.gg/TqKHVUa) | [Help Docs](https://help.firesidebot.com)')

    message.channel.send(infoEmbed);
};

module.exports.config = {
    name: 'botinfo',
    d_name: 'BotInfo',
    aliases: ['stats', 'bi'],
    category: 'Info',
    desc: 'Displays relevant Bot info',
    example: 'botinfo'
};