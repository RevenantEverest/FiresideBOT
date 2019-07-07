const axios = require('axios');
const services = {};

services.getTrack = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${data.track}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
};

services.getSongInfo = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LASTFM_API_KEY}&artist=${data.artist}&track=${data.track}&format=json`);
};

services.getSongsByGenre = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${data}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
};

module.exports = services;