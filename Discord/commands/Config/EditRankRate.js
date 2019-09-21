const settingsDB = require('../../models/discordRankSettingsDB');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value');
    if(parseInt(args[1], 10) <= 0) return message.channel.send("Please choose a number higher than 0");

    settingsDB.updateRate({ guild_id: message.guild.id, general_increase_rate: parseInt(args[1], 10) })
    .then(() => message.channel.send(`Server rank rate updated to **${args[1]}**`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Rank Rate", "EditRankRate"));
};

module.exports.config = {
    name: 'editrankrate',
    d_name: 'EditRankrate',
    aliases: ['err'],
    params: { required: true, params: "Number" },
    category: 'Config',
    desc: 'Update server rank rate (How much EXP is aquired per message)',
    example: 'editrankrank 12'
};