const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let infoEmbed = new Discord.MessageEmbed();
    
    let vc_Count = 0;
    let tc_Count = 0;
    let cc_Count = 0;

    for(let i = 0; i < message.guild.channels.cache.array().length; i++) {
        if(message.guild.channels.cache.array()[i].type === 'text') tc_Count++;
        else if(message.guild.channels.cache.array()[i].type === 'voice') vc_Count++;
        else if(message.guild.channels.cache.array()[i].type === 'category') cc_Count++;
    }

    infoEmbed
    .setColor(0xff0066)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setAuthor(`Server Info For ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
    .addField("Owner:", message.guild.owner, true)
    .addField("Region:", message.guild.region, true)
    .addField("Members:", message.guild.memberCount.toLocaleString(), true)
    .addField("Roles:", message.guild.roles.cache.array().length.toLocaleString(), true)
    .addField("Text Channels:", tc_Count.toLocaleString(), true)
    .addField("Voice Channels:", vc_Count.toLocaleString(), true)
    .setFooter(`ID: ${message.guild.id}`)
    
    message.channel.send(infoEmbed);
};

module.exports.config = {
    name: 'serverinfo',
    d_name: 'ServerInfo',
    aliases: ['si'],
    category: 'Info',
    desc: 'Displays relevant Server Info',
    example: 'serverinfo'
};