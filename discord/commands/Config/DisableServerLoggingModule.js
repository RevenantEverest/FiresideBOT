const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please spcify a flag(s) for the module you'd like to enable");

    let re = new RegExp(`${this.config.flags.join("|")}`, "ig");
    let matches = args.join(" ").match(re);
    let moduleMessage = "";

    if(!matches) return message.channel.send("Invalid flag provided");

    let modules = {};
    matches.forEach(el => {
        switch(el) {
            case "-mrc":
                moduleMessage = "**Member Role Change**";
                modules.memberRoleChange = {enabled: false};
                break;
            case "-mnc":
                moduleMessage = "**Member Nickname Change**";
                modules.memberNicknameChange = {enabled: false};
                break;
            case "-ec":
                moduleMessage = "**Emoji Create**";
                modules.emojiCreate = {enabled: false};
                break;
            case "-eu":
                moduleMessage = "**Emoji Update**";
                modules.emojiUpdate = {enabled: false};
                break;
            case "-ed":
                moduleMessage = "**Emoji Delete**";
                modules.emojiDelete = {enabled: false};
                break;
            case "-rc":
                moduleMessage = "**Role Create**";
                modules.roleCreate = {enabled: false};
                break;
            case "-ru":
                moduleMessage = "**Role Update**";
                modules.roleUpdate = {enabled: false};
                break;
            case "-rd":
                moduleMessage = "**Role Delete**";
                modules.roleDelete = {enabled: false};
                break;
            default:
                break;
        }
    });

    logSettingsController.getByGuildId(bot, message, this.config.d_name, message.guild.id, updateSettings, () => {
        return message.channel.send("Modules already disabled");
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

        console.log(data.member_role_change);
        logSettingsController.update(bot, message, "DisableServerLoggingModule", data, () => {
            return message.channel.send(`Server Logging Module ${moduleMessage} disabled`);
        });
    };
};

module.exports.config = {
    name: 'disableerverloggingmodule',
    d_name: 'DisableServerLoggingModule',
    aliases: ['dslm'],
    params: { required: true, params: 'Flag' },
    flags: ['-mrc', '-mnc', '-ec', '-eu', '-ed', '-rc', '-ru', '-rd'],
    category: 'Config',
    desc: 'Disables a Server Logging Module',
    example: 'disableserverlogging -ru'
};