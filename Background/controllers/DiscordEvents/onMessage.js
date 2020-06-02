const { Permissions } = require('discord.js');
const currencyController = require('../currencyController');
const ranksController = require('../ranksController');

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    currencyController.handleCurrency(message);
    ranksController.handleEXP(bot, message);
};