const autoRoleController = require('../../controllers/dbControllers/autoRoleController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    autoRoleController.getByGuildId(bot, message, "RemoveAutoRole", message.guild.id, deleteAutoRole, () => {
        return message.channel.send("No Auto Role Available");
    });

    async function deleteAutoRole(autoRole) {
        autoRoleController.delete(bot, message, "RemoveAutoRole", autoRole.id, () => {
            return message.channel.send("AutoRole removed");
        });
    };
};

module.exports.config = {
    name: 'removeautorole',
    d_name: 'RemoveAutoRole',
    aliases: ['rar'],
    params: { required: true, params: '@Role Tag' },
    category: 'Admin',
    desc: 'Removes set AutoRole (Also disables AutoRole)',
    example: 'autorole @users'
};