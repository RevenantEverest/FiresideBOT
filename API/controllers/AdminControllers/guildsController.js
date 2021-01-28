const bot = require('../../Discord_Bot');

module.exports = {
    getBotGuilds(req, res, next) {
        let botGuilds = bot.guilds.cache.array();
        if(botGuilds) return res.json({ data: botGuilds });
        else next(err);
    }
};