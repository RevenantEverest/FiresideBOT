const Discord = require('discord.js');
const moment = require('moment');
const guildsController = require('../../guildsController');

module.exports = async (bot, oldGuild, newGuild) => {
    if(oldGuild.name !== newGuild.name)
        guildsController.updateGuild(bot, oldGuild, newGuild)
};