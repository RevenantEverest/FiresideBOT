const streamerRolesController = require('../../controllers/dbControllers/streamerRolesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please tag a Role you'd like server members who're streaming to be given");

    let role_id = null;
    if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Role you'd like server members who're streaming to be given");

    streamerRolesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleStreamerRole, () => {
        let data = { guild_id: message.guild.id, role_id: role_id, enabled: true };
        streamerRolesController.save(bot, message, this.config.d_name, data, () => {
            return message.channel.send(`Streamer Role is now **enabled** and anyone member who goes live will be given the <@&${role_id}> role`);
        });
    });

    async function handleStreamerRole(settings) {
        settings.role_id = role_id;
        settings.enabled = true;
        streamerRolesController.update(bot, message, "EnableStreamerRole", settings, () => {
            return message.channel.send(`Streamer Role is now **enabled** and anyone member who goes live will be given the <@&${role_id}> role`);
        });
    };
};

module.exports.config = {
    name: 'enablestreamerrole',
    d_name: 'EnableStreamerRole',
    aliases: ['esr'],
    params: { required: true, params: 'Role Tag' },
    category: 'Admin',
    desc: `Enables Streamer Role system to give anyone who's streaming a role`,
    example: `enablestreamerrole @isLive`
};