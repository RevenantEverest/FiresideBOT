const guildSettingsController = require('../../controllers/dbControllers/guildSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify what you'd like to change Firesides Preifx to");

    guildSettingsController.getByGuildId(bot, message, "EditPrefix", message.guild.id, updateSettings, () => {
        let data = { guild_id: message.guild.id, prefix: "?", volume: 50 };
        guildSettingsController.save(bot, message, "EditPrefix", data, updateSettings);
    });

    async function updateSettings(settings) {
        let data = { guild_id: message.guild.id, prefix: args[1], volume: settings.volume };
        guildSettingsController.update(bot, message, "EditPrefix", data, (newSettings) => {
            return message.channel.send(`Prefix updated to **${newSettings.prefix}**`);
        });
    };
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