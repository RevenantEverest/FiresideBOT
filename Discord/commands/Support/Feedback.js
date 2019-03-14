const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please write a message to send as feedback');
    let embed = new Discord.RichEmbed();
    args.splice(0, 1);
    if(args.join(" ").split("").length >= 1024) return message.channel.send("Please reduce message size to under 1024 characters.");
    embed
    .setTitle('**New Feedback**')
    .setColor(0x00cc99)
    .addField('Username: ', message.author.username, true)
    .addField('ID: ', message.author.id, true)
    .addField('Message: ', args.join(" "))
    bot.channels.get('542548055392780313').send(embed);
    message.channel.send('Message sent! Thank you for your Feedback!');
};

module.exports.config = {
    name: 'feedback',
    d_name: 'Feedback',
    aliases: [],
    params: { required: true, params: `Message you'd like to send as Feedback` },
    category: 'Support',
    desc: 'Submit feedback to the Fireside Dev Team',
    example: `feedback This bot could be better`
};