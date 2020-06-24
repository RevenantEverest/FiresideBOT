const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);

    logSettingsController.getByGuildId(bot, message, "DisableServerLogging", message.guild.id, updateLogSetting, () => {
        return message.channel.send("Serer Logging is already disabled");
    });

    async function updateLogSetting(settings) {
        if(!settings.enabled) return message.channel.send("Server Logging is already disabled");
        let data = { 
            guild_id: message.guild.id, 
            enabled: false, 
            channel_id: settings.channel_id,
            member_role_change: settings.member_role_change,
            member_nickname_change: settings.member_nickname_change,
            emoji_create: settings.emoji_create,
            emoji_update: settings.emoji_update,
            emoji_delete: settings.emoji_delete,
            role_create: settings.role_create,
            role_update: settings.role_update,
            role_delete: settings.role_delete
        };
        logSettingsController.update(bot, message, "DisableServerLogging", data, () => {
            return message.channel.send("Server Logging is now **disabled**");
        });
    };
};

module.exports.config = {
    name: 'disableserverlogging',
    d_name: 'DisableServerLogging',
    aliases: ['dsl'],
    category: 'Config',
    desc: 'Disable Server Logging',
    example: 'disableserverlogging'
};