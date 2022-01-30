const bot = require('../../../Discord_Bot');

module.exports = (embed) => {    
    const channelId = process.env.ENVIRONMENT === "DEV" ? "427883469092159492" : "896220035247394826";
    bot.channels.resolve(channelId).send(embed);
};