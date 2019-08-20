const settingsDB = require('../../models/discordRankSettingsDB');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value');
    if(parseInt(args[1], 10) <= 0) return message.channel.send("Please choose a number higher than 0");
    if(parseInt(args[1], 10) > 10) return message.channel.send("Complexity can only go from 1 to 10");

    settingsDB.updateComplexity({ guild_id: message.guild.id, complexity: parseInt(args[1], 10) })
    .then(() => message.channel.send(`Server rank complexity updated to **${args[1]}**`))
    .catch(err => errorHandler(message, err, "Error Updating Rank Complexity", "EditRankComplexity"));
};

module.exports.config = {
    name: 'editrankcomplexity',
    d_name: 'EditRankComplexity',
    aliases: ['erc'],
    params: { required: true, params: "Number" },
    category: 'Config',
    desc: 'Update server rank complexity',
    example: 'editrankcomplexity 10'
};