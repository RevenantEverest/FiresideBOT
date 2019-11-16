const Discord = require('discord.js');
const utils = require('../utils/utils');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send();
    if(!args[2]) return message.channel.send();
    if(!Number.isInteger(parseInt(args[2], 10))) return message.chennel.send();

    let embed = new Discord.RichEmbed();
    let user_id = null;
    let reason = 'No Reason Given';
    let days = parseInt(args[2], 10);

    if(/<@!?(\d+)>/.exec(args.join(" "))) user_id = /<@!?(\d+)>/.exec(args.join(" "))[1];
    if(args[3]) {
        args.splice(2, 1);
        args.splice(1, 1);
        args.splice(0, 1);
        reason = args.join(" ");
    };

    embed
    .setColor(0xff0000)
    .addField('Banned User', `${bot.users.get(user_id).username}\n`)
    .addField('Length (Days):', days, true)
    .addField('Reason:', reason, true)
    .setFooter(`Banned by: ${message.author.username} on ${await utils.getDate()}`)

    message.guild.ban(user_id, { days: days, reason: reason })
    .then(() => message.channel.send(embed))
    .catch(err => {
        if(err.code === 50013)
            return message.channel.send("Invalid permissions to perform action");
    });
};

module.exports.config = {
    name: 'ban',
    d_name: 'Ban',
    aliases: [],
    params: { required: true, params: 'Tag \n Optional Param' },
    category: 'Admin',
    desc: 'Bans a user',
    example: 'ban @RevenantEverest 5 His memes are low tier'
};