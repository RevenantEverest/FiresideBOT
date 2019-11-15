const { Permissions } = require('discord.js');
const logSettingsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Level Ups posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");

    let permissions = new Permissions(bot.channels.get(channel_id).permissionsFor(bot.user).bitfield);
    if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS"))
        return message.channel.send("Fireside doesn't have permissions to post or embed links in that channel");

    logSettingsController.getByGuildId(bot, message, "EditLogChannel", message.guild.id, updateLogSetting, () => {
        let data = { guild_id: message.guild.id, channel_id: "none", enabled: false };
        logSettingsController.save(bot, message, "EditLogChannel", data, updateLogSetting);
    });

    async function updateLogSetting(settings) {
        let data = { guild_id: message.guild.id, channel_id: channel_id, enabled: settings.enabled };
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