const Discord = require('discord.js');
const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    return message.channel.send("This command has been deprecated, please use **AddRoleReaction** instead");
};

module.exports.config = {
    name: 'createrolereaction',
    d_name: 'CreateRoleReaction',
    aliases: ['crr'],
    params: { required: true, params: '@Role Tag, #text-channel-tag, emoji, optional title of embed, optional overwritable description' },
    category: 'Admin',
    desc: `Creates a new role embed in which when a member reacts to it, they'll receive that role`,
    example: `createrolereaction @Gamers #general ❤️ React to this if you're a true gamer -d Taking this role will grant access to gaming channels`
};