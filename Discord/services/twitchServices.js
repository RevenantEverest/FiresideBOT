const axios = require('axios');
const services = {};

services.getTwitchInfo = (data) => {
    return axios.get(`https://api.twitch.tv/kraken/channels/${data}?client_id=${process.env.TWITCH_CLIENT_ID}`);
};

services.getTwitchStreamStatus = (data) => {
    return axios.get(`https://api.twitch.tv/kraken/streams/${data}?client_id=${process.env.TWITCH_CLIENT_ID}`);
};

module.exports = services;