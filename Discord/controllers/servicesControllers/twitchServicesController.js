const twitchServices = require('../../services/twitchServices');
const errorHandler = require('../errorHandler');
const services = {};

services.getTwitchInfo = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchInfo(data)
    .then(twitchUser => callback(twitchUser))
    .catch(err => {
        console.log(err.response)
        errorHandler(bot, message, err, "Twitch API Error", command);
    });
};

services.getTwitchUserFollowers  = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchUserFollowers(data)
    .then(followers => callback(followers))
    .catch(err => errorHandler(bot, message, err, "Twitch API Error", command));
};

services.getStreamStatus = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchStreamStatus(data)
    .then(streamStatus => callback(streamStatus))
    .catch(err => errorHandler(bot, message, err, "Twitch API Error", command));
};

services.getTwitchGame = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchGame(data)
    .then(game => callback(game))
    .catch(err => errorHandler(bot, message, err, "Twitch API Error", command))
};

module.exports = services;