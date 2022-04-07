const streamerRolesController = require('../../controllers/dbControllers/streamerRolesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please tag a Role you'd like server members who're streaming to be given");

    let role_id = null;
    if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Role you'd like server members who're streaming to be given");

    streamerRolesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleStreamerRole, () => {
        let data = { guild_id: message.guild.id, role_id: role_id, enabled: false };
        streamerRolesController.save(bot, message, this.config.d_name, data, () => {
            return message.channel.send(`Streamer Role is updated to give any member who goes live the <@&${role_id}> role`);
        });
    });

    async function handleStreamerRole(settings) {
        settings.role_id = role_id;
        streamerRolesController.update(bot, message, "EnableStreamerRole", settings, () => {
            return message.channel.send(`Streamer Role is updated to give any member who goes live the <@&${role_id}> role`);
        });
    };
};

module.exports.config = {
    name: 'editstreamerrole',
    d_name: 'EditStreamerRole',
    aliases: ['editsr'],
    params: { required: true, params: 'Role Tag' },
    category: 'Admin',
    desc: `Edits Streamer Role that is given anyone who's streaming in you server`,
    example: `editstreamerrole @isLive`
};