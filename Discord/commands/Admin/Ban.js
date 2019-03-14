module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    let user_id = /<@!?(\d+)>/.exec(args.join(" "))[1];
    console.log(user_id)
    // message.guild.ban(user_id, { days: days, reason: reason })

};

module.exports.config = {
    name: 'ban',
    d_name: 'Ban',
    aliases: [],
    params: { required: true, params: 'Tag \n Optional Param' },
    category: 'Admin',
    desc: '',
    example: 'ban @RevenantEverest -t 5d -r His memes are low tier'
};