const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a Role Reaction ID");
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid Role Reaction ID");

    let roleReaction_id = parseInt(args[1], 10);
    roleReactionsController.getOne(bot, message, "DeleteRoleReaction", roleReaction_id, handleDeleteRoleReaction, () => {
        return message.channel.send("Invalid Role Reaction ID");
    });

    async function handleDeleteRoleReaction(roleReaction) {
        if(roleReaction.guild_id !== message.guild.id) 
            return message.channel.send("Invalid Role Reaction ID");
        
        
        console.log(roleReaction.id);
        roleReactionsController.delete(bot, message, "DeleteRoleReaction", roleReaction.id, () => {
            return message.channel.send(`Role Reaction **${roleReaction.id}** successfully deleted`);
        });
    };
};

module.exports.config = {
    name: 'deleterolereaction',
    d_name: 'DeleteRoleReaction',
    aliases: ['drr', 'delrr'],
    params: { required: true, params: 'Role Reaction ID' },
    category: 'Admin',
    desc: `Deletes a role reaction embed`,
    example: `deleterolereaction 67`
};