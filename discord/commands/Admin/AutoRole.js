const autoRoleController = require('../../controllers/dbControllers/autoRoleController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let role_id = null;

    if(args[1]) {
        if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
        else return message.channel.send("Invalid Role ID. Please tag a role you'd like new members to recieve");
    }

    autoRoleController.getByGuildId(bot, message, "AutoRole", message.guild.id, (!args[1] ? displayAutoRole : updateAutoRole), () => {
        if(!args[1]) return message.channel.send("No Auto Role Set"); 

        let data = { guild_id: message.guild.id, role_id: role_id };
        autoRoleController.save(bot, message, "AutoRole", data, (autoRole) => {
            return message.channel.send(`<@&${autoRole.role_id}> will now be given to new server members`);
        });
    });

    async function updateAutoRole(autoRole) {
        let data = { id: autoRole.id, guild_id: message.guild.id, role_id: role_id };
        autoRoleController.update(bot, message, "AutoRole", data, (newAutoRole) => {
            return message.channel.send(`Auto Role updated to now allow <@&${newAutoRole.role_id}> to be given to new server members`);
        });
    };

    async function displayAutoRole(autoRole) {
        return message.channel.send(`Current Auto Role is <@&${autoRole.role_id}>`);
    };
};

module.exports.config = {
    name: 'autorole',
    d_name: 'AutoRole',
    aliases: ['ar'],
    params: { required: true, params: '@Role Tag' },
    category: 'Admin',
    desc: 'Assign a role to give new server members when they join',
    example: 'autorole @users'
};