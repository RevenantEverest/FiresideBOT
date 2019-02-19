module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);

    

};

module.exports.config = {
    name: 'banuser',
    d_name: 'BanUser',
    aliases: [],
    params: { required: true, params: 'Tag \n Optional Param' }
};