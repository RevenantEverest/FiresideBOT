const axios = require('axios');
const config = require('../config/config');
const services = {};

services.getClientToken = () => {
    const client_id = process.env.TWITCH_CLIENT_ID;
    const client_secret = process.env.TWITCH_CLIENT_SECRET;
    return axios({
        method: "POST",
        url: `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
    });
};

services.getTwitchInfo = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/users?login=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${config.accessTokens.twitch}`
        }
    });
};

services.getTwitchStreamStatus = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/streams?user_login=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${config.accessTokens.twitch}`
        }
    });
};

services.getTwitchUserFollowers = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/users/follows?to_id=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${config.accessTokens.twitch}`
        }
    });
};

services.getTwitchGame = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/games?id=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${config.accessTokens.twitch}`
        }
    })
};

module.exports = services;