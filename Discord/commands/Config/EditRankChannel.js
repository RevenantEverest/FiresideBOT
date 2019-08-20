const settingsDB = require('../../models/discordRankSettingsDB');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Level Ups posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");

    settingsDB.updateChannel({ guild_id: message.guild.id, channel_id: channel_id })
    .then(() => message.channel.send(`Level Ups will now be posted in <#${channel_id}>`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Rank Channel", "EditRankChannel"));
};

module.exports.config = {
    name: 'editrankchannel',
    d_name: 'EditRankChannel',
    aliases: ['ercp'],
    params: { required: true, params: '#Channel Tag' },
    category: 'Config',
    desc: 'Update the channel Level Ups are posted in',
    example: 'editrank #bot-commands'
};