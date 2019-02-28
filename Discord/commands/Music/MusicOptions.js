const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let embed = new Discord.RichEmbed();

    if(!args[1]) {
        embed
        .addBlankField()
        .setThumbnail('https://i.imgur.com/Xalu0fX.png')
        .setTitle('**Music Options**')
        .addField('Volume: ', `${server.queue.options.volume}`)
        .addField('Looping: ', `${server.queue.options.loop ? 'On' : 'Off'}`, true)
        .addField('Recommendations: ', `${server.queue.options.recommendations ? 'On' : 'Off'}`, true)
        .setColor(0xcc00ff)
    
        message.channel.send(embed);
    }

    else if(args[1] === '-r') {
        if(server.queue.options.recommendations) {
            server.queue.options.recommendations = false;
            embed.addField('**Music Options**', 'Recommendations are now **off**').setColor(0xcc00ff);
        }
        else {
            server.queue.options.recommendations = true;
            embed.addField('**Music Options**', 'Recommendations are now **on**').setColor(0xcc00ff);
        }
        
        message.channel.send(embed);
    }

    else if(args[1] === '-l') {
        if(server.queue.options.loop) {
            server.queue.options.loop = false;
            embed.addField('**Music Options**', 'Looping is now **off**').setColor(0xcc00ff);
        }
        else {
            server.queue.options.loop = true;
            embed.addField('**Music Options**', 'Looping is now **on**').setColor(0xcc00ff);
        }
        message.channel.send(embed);
    }
};

module.exports.config = {
    name: 'musicoptions',
    d_name: 'MusicOptions',
    aliases: ['mo'],
    params: { required: false },
    flags: ['-l', '-r'],
    category: 'Music',
    desc: 'Displays current Music Options',
    example: 'musicoptions'
}