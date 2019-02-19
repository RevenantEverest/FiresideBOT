const axios = require('axios');
const services = {};

services.getLyrics = (data) => {
    return axios({
        method: 'GET',
        url: `https://api.ksoft.si/lyrics/search?q=${data}`,
        headers: {
            'Authorization': 'NANI ' + process.env.KSOFT_API_KEY
        }
    });
};

services.getTrack = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${data.track}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
};

services.getSongInfo = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LASTFM_API_KEY}&artist=${data.artist}&track=${data.track}&format=json`);
};

services.getSongsByGenre = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${data}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
};

services.getWeather = (data) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=${process.env.WEATHER_API_KEY}`);
};

services.getTwitchInfo = (data) => {
    return axios.get(`https://api.twitch.tv/kraken/channels/${data}?client_id=${process.env.TWITCH_CLIENT_ID}`);
};

services.getTwitchStreamStatus = (data) => {
    return axios.get(`https://api.twitch.tv/kraken/streams/${data}?client_id=${process.env.TWITCH_CLIENT_ID}`);
};

module.exports = services;