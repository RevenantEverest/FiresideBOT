const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let embed = new Discord.RichEmbed();
    server.queue.options.loop ? server.queue.options.loop = false : server.queue.options.loop = true;
    
    embed.addField('**Music Options**', `Autoplay(loop) is now ${server.queue.options.loop ? '**on**' : '**off**'}`)
    message.channel.send(embed.setColor(0xcc00ff));
};

module.exports.config = {
    name: 'loop',
    d_name: 'Loop',
    aliases: [],
    category: 'Music',
    desc: 'Toggles queue looping',
    example: 'loop'
};