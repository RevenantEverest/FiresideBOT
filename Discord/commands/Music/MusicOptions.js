const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let embed = new Discord.MessageEmbed();
    embed.setColor(0xcc00ff)

    if(!args[1]) {
        embed
        .addBlankField()
        .setThumbnail('https://i.imgur.com/Xalu0fX.png')
        .setTitle('**Music Options**')
        .addField('Volume: ', `${server.queue.options.volume}`, true)
        .addField('Looping: ', `${server.queue.options.loop ? 'On' : 'Off'}`, true)
        .addField('Recommendations: ', `${server.queue.options.recommendations ? 'On' : 'Off'}`, true)
        .addField('Vote To Skip: ', `${server.queue.options.voteToSkip ? 'On' : 'Off'}`, true)
    }

    else if(args.includes("-r")) {
        server.queue.options.recommendations ? server.queue.options.recommendations = false : server.queue.options.recommendations = true;
        embed.addField('**Music Options**',`Recommendations are now ${server.queue.options.recommendations ? '**on**' : '**off**'}`);
    }
    else if(args.includes("-l")) {
        server.queue.options.loop ? server.queue.options.loop = false : server.queue.options.loop = true;
        embed.addField('**Music Options**', `Looping is now ${server.queue.options.loop ? '**on**' : '**off**'}`);
    }
    else if(args.includes("-v")) {
        server.queue.options.voteToSkip ? server.queue.options.voteToSkip = false : server.queue.options.voteToSkip = true;
        embed.addField('**Music Options**', `Vote To Skip is now ${server.queue.options.voteToSkip ? '**on**' : '**off**'}`);
    }
    
    message.channel.send(embed);
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
};