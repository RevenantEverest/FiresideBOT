const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let embed = new Discord.RichEmbed();

    if(server.queue.options.loop) {
        server.queue.options.loop = false;
        embed.addField('**Music Options**', 'Looping is now **off**').setColor(0xcc00ff);
        message.channel.send(embed);
    }
    else if(!server.queue.options.loop) {
        server.queue.options.loop = true;
        embed.addField('**Music Options**', 'Looping is now **on**').setColor(0xcc00ff);
        message.channel.send(embed);
    }
};

module.exports.config = {
    name: 'loop',
    d_name: 'Loop',
    aliases: [],
    category: 'Music',
    desc: 'Toggles queue looping',
    example: 'loop'
};