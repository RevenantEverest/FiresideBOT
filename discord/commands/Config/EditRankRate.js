const rankSettingsController = require('../../controllers/dbControllers/rankSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value');
    if(parseInt(args[1], 10) <= 0) return message.channel.send("Please choose a number higher than 0");

    rankSettingsController.getByGuildId(bot, message, "EditRankRate", message.guild.id, updateSettings, () => {
        let data = { guild_id: message.guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" };
        rankSettingsController.save(bot, message, "EditRankRate", data, updateSettings);
    });

    async function updateSettings(settings) {
        let data = { guild_id: message.guild.id, general_increase_rate: parseInt(args[1], 10), complexity: settings.complexity, channel_id: settings.channel_id };
        rankSettingsController.update(bot, message, "EditRankRate", data, (newSettings) => {
            return message.channel.send(`Server Rank EXP per message updated to **${newSettings.general_increase_rate}**`);
        });
    };
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