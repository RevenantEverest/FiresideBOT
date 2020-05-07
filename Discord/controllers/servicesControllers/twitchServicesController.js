const twitchServices = require('../../services/twitchServices');
const twitchTokenController = require('../twitchTokensController');
const errorHandler = require('../errorHandler');
const services = {};

services.getTwitchInfo = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchInfo(data)
    .then(twitchUser => callback(twitchUser))
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401)
                return twitchTokenController.updateToken(services.getTwitchInfo(bot, message, command, data, callback));
        }
        else errorHandler(bot, message, err, "Twitch API Error", command);
    });
};

services.getTwitchUserFollowers  = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchUserFollowers(data)
    .then(followers => callback(followers))
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401)
                return twitchTokenController.updateToken(services.getTwitchUserFollowers(bot, message, command, data, callback));
        }
        else errorHandler(bot, message, err, "Twitch API Error", command);
    });
};

services.getStreamStatus = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchStreamStatus(data)
    .then(streamStatus => callback(streamStatus))
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401)
                return twitchTokenController.updateToken(services.getStreamStatus(bot, message, command, data, callback));
        }
        else errorHandler(bot, message, err, "Twitch API Error", command);
    });
};

services.getTwitchGame = async (bot, message, command, data, callback) => {
    twitchServices.getTwitchGame(data)
    .then(game => callback(game))
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401)
                return twitchTokenController.updateToken(services.getTwitchGame(bot, message, command, data, callback));
        }
        else errorHandler(bot, message, err, "Twitch API Error", command);
    })
};

module.exports = services;