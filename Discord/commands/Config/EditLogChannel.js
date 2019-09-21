const db = require('../../models/GuildModels/guildLogSettingsDB');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Level Ups posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");
};

module.exports.config = {
    name: 'editlogchannel',
    d_name: 'EditLogChannel',
    aliases: ['elc'],
    params: { required: true, params: '#Channel Tag' },
    category: 'Config',
    desc: 'Change where server logs are posted',
    example: 'editlogchannel #bot-commands'
};