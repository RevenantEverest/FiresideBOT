const { Permissions } = require('discord.js');
const currencyController = require('../currencyController');
const ranksController = require('../ranksController');

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    currencyController.handleCurrency(message);
    ranksController.handleEXP(bot, message);

    let permissions = new Permissions(message.channel.permissionsFor(bot.user).bitfield);
    if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS")) return;
};