const config = require('../config/config');
const apiTokensContoller = require('./apiTokensController');
const twitchServices = require('../services/twitchServices');
const moment = require('moment');
const services = {};

services.getToken = (callback) => {
    apiTokensContoller.getByService("twitch", handleToken, () => {
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
    apiTokensContoller.getByService("twitch", updateToken, () => {
        services.generateToken(generatedToken => {
            services.save(generatedToken, handleToken);
        }); 
    });

    async function updateToken(token) {
        services.generateToken(generatedToken => {
            services.update(generatedToken, callback)
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
    apiTokensContoller.save(data, handleToken);

    async function handleToken(token) {
        config.accessTokens.twitch = token.token;
        callback();
    };
};

services.update = (token, generatedToken, callback) => {
    token.token = generatedToken.access_token;
    token.expires_in = generatedToken.expires_in;
    token.date = moment();

    apiTokensContoller.update(data, handleToken);

    async function handleToken(token) {
        config.accessTokens.twitch = token.token;
        callback();
    };
};

module.exports = services;