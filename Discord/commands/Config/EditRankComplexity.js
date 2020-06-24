const rankSettingsController = require('../../controllers/dbControllers/rankSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value');
    if(parseInt(args[1], 10) <= 0) return message.channel.send("Please choose a number higher than **0**");
    if(parseInt(args[1], 10) > 10) return message.channel.send("Complexity can only go from **1** to **10**");

    rankSettingsController.getByGuildId(bot, message, "EditRankComplexity", message.guild.id, updateSettings, () => {
        let data = { guild_id: message.guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" };
        rankSettingsController.save(bot, message, "EditRankComplexity", data, updateSettings);
    });

    async function updateSettings(settings) {
        let data = { guild_id: message.guild.id, general_increase_rate: settings.general_increase_rate, complexity: parseInt(args[1], 10), channel_id: settings.channel_id };
        rankSettingsController.update(bot, message, "EditRankComplexity", data, (newSettings) => {
            return message.channel.send(`Server Rank Complexity updated to **${newSettings.complexity}**`);
        });
    };
};

module.exports.config = {
    name: 'editrankcomplexity',
    d_name: 'EditRankComplexity',
    aliases: ['erc'],
    params: { required: true, params: "Number" },
    category: 'Config',
    desc: 'Update server rank complexity (How hard it is to level up)',
    example: 'editrankcomplexity 10'
};