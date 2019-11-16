const Discord = require('discord.js');
const config = require('../../config/config');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('https://discord.gg/TqKHVUa');
};

module.exports.config = {
    name: 'support',
    d_name: 'Support',
    aliases: [],
    category: 'Support',
    desc: 'Sends a link to the Support Discord Server',
    example: 'support'
};