const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let embed = new Discord.RichEmbed();
    server.queue.options.recommendations ? server.queue.options.recommendations = false : server.queue.options.recommendations = true;
    
    embed.addField('**Music Options**', `Autoplay(Recommendations) is now ${server.queue.options.recommendations ? '**on**' : '**off**'}`)
    message.channel.send(embed.setColor(0xcc00ff));
};

module.exports.config = {
    name: 'autoplay',
    d_name: 'Autoplay',
    aliases: [],
    category: 'Music',
    desc: 'Enables or Disables music recommendations',
    example: 'autoplay'
};