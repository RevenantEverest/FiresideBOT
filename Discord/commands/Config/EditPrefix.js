const guildsDB = require('../../models/GuildModels/guildsDB');
const errorHandler = require('../../controllers/errorHandler');

async function updateGuildSettings(bot, message, args) {
    guildsDB.updateSettings({ guild_id: message.guild.id, prefix: args[1], volume: findGuildSettings.volume })
    .then(() => message.channel.send(`Prefix updated to **${args[1]}**`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Prefix", "EditPrefix"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify what you'd like to change Firesides Preifx to");
    
    guildsDB.findSettings(message.guild.id)
    .then(settings => updateGuildSettings(bot, message, args, settings))
    .catch(err => console.error(err));
};

module.exports.config = {
    name: 'editprefix',
    d_name: 'EditPrefix',
    aliases: [],
    params: { required: true, params: 'Desired Prefix' },
    category: 'Config',
    desc: 'Change prefix',
    example: 'editprefix'
};