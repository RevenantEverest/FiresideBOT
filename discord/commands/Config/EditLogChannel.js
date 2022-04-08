const { Permissions } = require('discord.js');
const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Level Ups posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");

    let permissions = new Permissions(bot.channels.resolve(channel_id).permissionsFor(bot.user).bitfield);
    if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS"))
        return message.channel.send("Fireside doesn't have permissions to post or embed links in that channel");

    logSettingsController.getByGuildId(bot, message, "EditLogChannel", message.guild.id, updateLogSetting, () => {
        let data = { 
            guild_id: message.guild.id, 
            channel_id: "none", 
            enabled: false,
            member_role_change: true,
            member_nickname_change: true,
            emoji_create: true,
            emoji_update: true,
            emoji_delete: true,
            role_create: true,
            role_update: true,
            role_delete: true
        };
        logSettingsController.save(bot, message, "EditLogChannel", data, updateLogSetting);
    });

    async function updateLogSetting(settings) {
        let data = { 
            guild_id: message.guild.id, 
            channel_id: channel_id, 
            enabled: settings.enabled,
            member_role_change: settings.member_role_change,
            member_nickname_change: settings.member_nickname_change,
            emoji_create: settings.emoji_create,
            emoji_update: settings.emoji_update,
            emoji_delete: settings.emoji_delete,
            role_create: settings.role_create,
            role_update: settings.role_update,
            role_delete: settings.role_delete
        };
        logSettingsController.update(bot, message, "EditLogChannel", data, () => {
            return message.channel.send(`Server Logs will now be posted in <#${channel_id}>`);
        });
    };
};

module.exports.config = {
    name: 'editlogchannel',
    d_name: 'EditLogChannel',
    aliases: ['elc'],
    params: { required: true, params: '#Channel Tag' },
    category: 'Config',
    desc: 'Change where server logs are posted',
    example: 'editlogchannel #bot-commands'
};