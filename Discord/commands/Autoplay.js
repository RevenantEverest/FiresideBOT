const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let embed = new Discord.RichEmbed();
    if(server.queue.options.recommendations) {
        server.queue.options.recommendations = false;
        embed.addField('**Music Options**', 'Autoplay(Recommendations) is now **off**').setColor(0xcc00ff);
        message.channel.send(embed);
    }
    else if(!server.queue.options.recommendations) {
        server.queue.options.recommendations = true;
        embed.addField('**Music Options**', 'Autoplay(Recommendations) is now **on**').setColor(0xcc00ff);
        message.channel.send(embed);
    }
};

module.exports.config = {
    name: 'autoplay',
    d_name: 'Autoplay',
    aliases: [],
    params: {},
    category: ['music', 'Music'],
    desc: 'Enables or Disables music recommendations'
};