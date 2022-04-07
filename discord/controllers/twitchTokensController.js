const config = require('../config/config');
const apiTokenContoller = require('./dbControllers/apiTokensController');
const twitchServices = require('../services/twitchServices');
const moment = require('moment');
const services = {};

services.getToken = (callback) => {
    apiTokenContoller.getByService("twitch", handleToken, () => {
        services.generateToken(generatedToken => {
            services.save(generatedToken, handleToken);
        }); 
    });

    async function handleToken(token) {
        config.accessTokens.twitch = token.token;
        callback();
    };
};

services.updateToken = (callback) => {
    apiTokenContoller.getByService("twitch", updateToken, () => {
        services.generateToken(generatedToken => {
            services.save(generatedToken, handleToken);
        }); 
    });

    async function updateToken(token) {
        services.generateToken(generatedToken => {
            services.update(token, generatedToken, callback)
        });
    };

    async function handleToken(token) {
        config.accessTokens.twitch = token.token;
        callback();
    };
};

services.generateToken = (callback) => {
    twitchServices.getClientToken()
    .then(generatedToken => callback(generatedToken.data))
    .catch(err => console.error(err));
};

services.save = (generatedToken, callback) => {
    let data = {
        service: "twitch", 
        token: generatedToken.access_token, 
        refresh_token: null, 
        expires_in: generatedToken.expires_in,
        date: moment()
    };
    apiTokenContoller.save(data, handleToken);

    async function handleToken(token) {
        config.accessTokens.twitch = token.token;
        callback();
    };
};

services.update = (token, generatedToken, callback) => {
    token.token = generatedToken.access_token;
    token.expires_in = generatedToken.expires_in;
    token.date = moment();

    apiTokenContoller.update(token, handleToken);

    async function handleToken(token) {
        config.accessTokens.twitch = token.token;
        callback();
    };
};

module.exports = services;