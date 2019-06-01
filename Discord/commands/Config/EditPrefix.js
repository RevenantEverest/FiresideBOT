const guildsDB = require('../../models/GuildModels/guildsDB');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify what you'd like to change Firesides Preifx to");
    
    guildsDB.updateSettings({ guild_id: message.guild.id, prefix: args[1] })
    .then(() => message.channel.send(`Prefix updated to **${args[1]}**`))
    .catch(err => {
        message.channel.send("Error Updating Prefix");
        console.error(err);
    })
};

module.exports.config = {
    name: 'editprefix',
    d_name: 'EditPrefix',
    aliases: ['ep'],
    params: { required: true, params: 'Desired Prefix' },
    category: 'Config',
    desc: 'Change prefix',
    example: 'editprefix'
};