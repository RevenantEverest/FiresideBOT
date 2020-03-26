const axios = require('axios');
const services = {};

services.getTwitchInfo = (data) => {
    return axios({
        method: "GET",
        // https://api.twitch.tv/helix/users?id=${data}
        url: `https://api.twitch.tv/helix/users?${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

services.getTwitchStreamStatus = (data) => {
    return axios({
        method: "GET",
        // https://api.twitch.tv/helix/streams?user_id=${data}
        url: `https://api.twitch.tv/helix/streams?${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    });
};

services.getTwitchGame = (data) => {
    return axios({
        method: "GET",
        // https://api.twitch.tv/helix/games?id=${data}
        url: `https://api.twitch.tv/helix/games?${data}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    })
};

module.exports = services;