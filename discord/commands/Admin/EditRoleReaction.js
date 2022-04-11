const Discord = require('discord.js');
const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    return message.channel.send("This command has been deprecated.\nPlease use **RoleReactions**, **AddRoleReaction**, or **DeleteRoleReaction**");
};

module.exports.config = {
    name: 'editrolereaction',
    d_name: 'EditRoleReaction',
    aliases: ['editrr', 'urr'],
    params: { required: true, params: 'Role ID' },
    flags: ['-d'],
    category: 'Admin',
    desc: `Updates an existing Role Reaction`,
    example: `editrolereaction 86 @New Role`
};