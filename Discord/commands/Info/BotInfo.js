const Discord = require('discord.js');
const config = require('../../../config/config');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let infoEmbed = new Discord.RichEmbed();

    let accountCreated = bot.user.createdAt.toString().split(" ");

    infoEmbed
    .setColor(0xff0066)
    .setThumbnail(bot.user.avatarURL)
    .addField('**Bot Info**', bot.user.username)
    .addBlankField()
    .addField('Users:', config.Discord_Users_Count, true)
    .addField('Guilds:', bot.guilds.array().length, true)
    .addField('Commands:', bot.commands.array().length, true)
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