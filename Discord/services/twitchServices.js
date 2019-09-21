const axios = require('axios');
const services = {};

services.getTwitchInfo = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/users?login=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    });
};

services.getTwitchStreamStatus = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/streams?user_login=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    });
};

services.getTwitchGame = (data) => {
    return axios({
        method: "GET",
        url: `https://api.twitch.tv/helix/games?id=${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    })
};

module.exports = services;