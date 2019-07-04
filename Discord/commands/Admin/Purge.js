const Discord = require('discord.js');
const utils = require('../utils/utils');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {    
    let userId = null;
    let messagecount = 10;
    if(/<@!?(\d+)>/.exec(args.join(" "))) userId = /<@!?(\d+)>/.exec(args.join(" "))[1];
    if(!userId && Number.isInteger(parseInt(args[1], 10))) messagecount = parseInt(args[1], 10);
    if(Number.isInteger(parseInt(args[2], 10))) messagecount = parseInt(args[2], 10);

    if(messagecount > 100)return message.channel.send("You can only delete 100 messages at a time");

    let date = await utils.getDate();
    
    message.channel.fetchMessages({ limit: messagecount })
    .then(messages => {
        let deleteMessages = messages;
        if(userId) deleteMessages = messages.array().filter(el => el.author.id === userId);

        message.channel.bulkDelete(deleteMessages).then(msg => {
        
            let embed = new Discord.RichEmbed();
            embed
            .setColor(0xff0000)
            .addField('Bulk Message Delete', `**Amount**: ${msg.size}`)
            .setFooter(`Used by: ${message.author.username} on ${date}`, message.author.avatarURL)
            message.channel.send(embed);
        })
        .catch(err => {
            if(err.code === 50034)
                return message.channel.send('You can only bulk delete messages that are under 14 days old')
        });
    });
};

module.exports.config = {
    name: "purge",
    d_name: "Purge",
    aliases: [],
    params: {required: false, params: '@Tag / Amount'},
    category: "Admin",
    desc: "Bulk delete messages",
    example: "purge @RevenantEverest 20"
};