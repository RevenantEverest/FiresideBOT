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

module.exports = services;