const config = require('../../config/config');

module.exports = {
    getUserSize(bot) {
        config.Discord_Users_Count = 0;
        for(let i = 0; i < bot.guilds.array().length; i++) {
            config.Discord_Users_Count += bot.guilds.array()[i].memberCount;
        }
    }
}