const streamerRolesController = require('../../controllers/dbControllers/streamerRolesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    streamerRolesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleStreamerRole, () => {
        return message.channel.send("Streamer Role is already disabled");
    });

    async function handleStreamerRole(settings) {
        settings.enabled = false;
        streamerRolesController.update(bot, message, "DisableStreamerRole", settings, () => {
            return message.channel.send("Streamer Role is now **disabled**");
        });
    }
};

module.exports.config = {
    name: 'disablestreamerrole',
    d_name: 'DisableStreamerRole',
    aliases: ['dsr'],
    category: 'Admin',
    desc: `Disables Streamer Role system that gives anyone who's streaming a role`,
    example: `disablestreamerrole`
};