const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let infoEmbed = new Discord.RichEmbed();
    
    let vc_Count = 0;
    let tc_Count = 0;
    let cc_Count = 0;

    for(let i = 0; i < message.guild.channels.array().length; i++) {
        if(message.guild.channels.array()[i].type === 'text') tc_Count++;
        else if(message.guild.channels.array()[i].type === 'voice') vc_Count++;
        else if(message.guild.channels.array()[i].type === 'category') cc_Count++;
    }

    infoEmbed
    .setColor(0xff0066)
    .setThumbnail(message.guild.iconURL)
    .addField('**Server Info**', message.guild.name)
    .addBlankField()
    .addField("Owner:", message.guild.owner, true)
    .addField("Region:", message.guild.region, true)
    .addField("Members:", message.guild.memberCount, true)
    .addField("Roles:", message.guild.roles.array().length, true)
    .addField("Text Channels:", tc_Count, true)
    .addField("Voice Channels:", vc_Count, true)
    
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