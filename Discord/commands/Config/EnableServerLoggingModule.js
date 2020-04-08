const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please spcify a flag(s) for the module you'd like to enable");

    let re = new RegExp(`${this.config.flags.join("|")}`, "ig");
    let matches = args.join(" ").match(re);

    if(!matches) return message.channel.send("Invalid flag provided");

    let modules = {};
    matches.forEach(el => {
        switch(el) {
            case "-mrc":
                modules.memberRoleChange = {enabled: true};
                break;
            case "-mnc":
                modules.memberNicknameChange = {enabled: true};
                break;
            case "-ec":
                modules.emojiCreate = {enabled: true};
                break;
            case "-eu":
                modules.emojiUpdate = {enabled: true};
                break;
            case "-ed":
                modules.emojiDelete = {enabled: true};
                break;
            case "-rc":
                modules.roleCreate = {enabled: true};
                break;
            case "-ru":
                modules.roleUpdate = {enabled: true};
                break;
            case "-rd":
                modules.roleDelete = {enabled: true};
                break;
            default:
                break;
        }
    });

    logSettingsController.getByGuildId(bot, message, this.config.d_name, message.guild.id, updateSettings, () => {
        return message.channel.send(`No Log Settings Found. Start by enabling log settings with **${PREFIX}enableserverlogging**`);
    });

    async function updateSettings(logSettings) {
        let data = {
            id: logSettings.id,
            guild_id: message.guild.id,
            enabled: logSettings.enabled,
            channel_id: logSettings.channel_id,
            member_role_change: modules.memberRoleChange ? modules.memberRoleChange.enabled : logSettings.member_role_change,
            member_nickname_change: modules.memberNicknameChange ? modules.memberNicknameChange.enabled : logSettings.member_nickname_change,
            emoji_create: modules.emojiCreate ? modules.emojiCreate.enabled : logSettings.emoji_create,
            emoji_update: modules.emojiUpdate ? modules.emojiUpdate.enabled : logSettings.emoji_update,
            emoji_delete: modules.emojiDelete ? modules.emojiDelete.enabled : logSettings.emoji_delete,
            role_create: modules.roleCreate ? modules.roleCreate.enabled : logSettings.role_create,
            role_update: modules.roleUpdate ? modules.roleUpdate.enabled : logSettings.role_update,
            role_delete: modules.roleDelete ? modules.roleDelete.enabled : logSettings.role_delete
        };

        logSettingsController.update(bot, message, "EnableServerLoggingModules", data, () => {
            return message.channel.send("Server Logging Modules Updated");
        });
    };
};

module.exports.config = {
    name: 'enableserverloggingmodule',
    d_name: 'EnableServerLoggingModule',
    aliases: ['eslm'],
    params: { required: true, params: 'Flag' },
    flags: ['-mrc', '-mnc', '-ec', '-eu', '-ed', '-rc', '-ru', '-rd'],
    category: 'Config',
    desc: 'Enables a Server Logging Module',
    example: 'enableserverlogging -ru'
};