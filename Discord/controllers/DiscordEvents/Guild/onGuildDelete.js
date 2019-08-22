const guildsController = require('../../guildsController');

module.exports = async (bot, guild) => {
    guildsController.removeGuild(bot, guild)
};