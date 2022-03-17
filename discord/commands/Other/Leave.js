const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);

    let embed = new Discord.MessageEmbed();

    embed.addField('**Remove FiresideBOT**', 'Are you sure you want to remove FiresideBOT?').setColor(0xff0000);
    message.channel.send(embed).then(async (msg) => {
        await msg.react("✅");
        await msg.react("❌");
  
        const r_collector = new Discord.ReactionCollector(msg, r => r.users.cache.array()[r.users.cache.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', (reaction, user) => {
            if(user.id === bot.user.id) return;
            if(reaction.emoji.name === "✅") {
                msg.delete();
                message.channel.send('Thank you for using FiresideBOT, we hope you reconsider!');
                message.guild.leave();
            }
            else if(reaction.emoji.name === "❌")  {
                r_collector.stop();
            }
        });
        r_collector.on('end', e => {
            msg.delete();
        })
    })
};

module.exports.config = {
    name: 'leave',
    d_name: 'Leave',
    aliases: [],
    category: 'Other',
    desc: 'Removes Fireside from your server',
    example: 'leave'
};