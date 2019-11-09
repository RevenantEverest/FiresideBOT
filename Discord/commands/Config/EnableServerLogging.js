const logSettings = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Logs posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the Logs to be posted in");

    /* Check if channel id provided is allowed to be posted in */

    logSettings.getByGuildId(bot, message, "EnableServerLogging", message.guild.id, updateSettings, () => {
        let data = { guild_id: message.guild.id, enabled: false, channel_id: "none" };
        logSettings.save(bot, message, "EnableServerLogging", data, updateSettings);
    });

    async function updateSettings(settings) {
        if(settings.enabled) return message.channel.send("Server Logging is already enabled");
        let data = { guild_id: message.guild.id, enabled: true, channel_id: channel_id };
        logSettings.update(bot, message, "EnableServerLogging", data, (newSettings) => {
            return message.channel.send(`Server Logging is now **enabled** and logs will be posted in <#${newSettings.channel_id}>`);
        });
    };
};

module.exports.config = {
    name: 'enableserverlogging',
    d_name: 'EnableServerLogging',
    aliases: ['esl'],
    params: { required: true, params: '#Channel Tag' },
    category: 'Config',
    desc: 'Enable Server Logging',
    example: 'enableserverlogging #bot-commands'
};