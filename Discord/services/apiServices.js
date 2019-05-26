const axios = require('axios');
const services = {};

/* Music API Services */

//Ksoft
services.getLyrics = (data) => {
    return axios({
        method: 'GET',
        url: `https://api.ksoft.si/lyrics/search?q=${data}`,
        headers: {
            'Authorization': 'NANI ' + process.env.KSOFT_API_KEY
        }
    });
};

//LastFM
services.getTrack = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${data.track}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
};

//LastFM
services.getSongInfo = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LASTFM_API_KEY}&artist=${data.artist}&track=${data.track}&format=json`);
};

//LastFM
services.getSongsByGenre = (data) => {
    return axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${data}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
};

/* Weather API */

//Open Weather Map
services.getWeather = (data) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=${process.env.WEATHER_API_KEY}`);
};

/* Twitch API */
services.getTwitchInfo = (data) => {
    return axios.get(`https://api.twitch.tv/kraken/channels/${data}?client_id=${process.env.TWITCH_CLIENT_ID}`);
};

services.getTwitchStreamStatus = (data) => {
    return axios.get(`https://api.twitch.tv/kraken/streams/${data}?client_id=${process.env.TWITCH_CLIENT_ID}`);
};

/* Game Stat API */

//Fortnite API
services.getFortniteStats = ({ platform, profile }) => {
    return axios({
        method: 'GET',
        url: `https://api.fortnitetracker.com/v1/profile/${platform}/${profile}`,
        headers: { 'TRN-Api-Key': process.env.TRN_FORTNITE_KEY }
    });
};

//Apex API
services.getApexStats = ({ platform, profile }) => {
    return axios({
        method: 'GET',
        url: `https://public-api.tracker.gg/apex/v1/standard/profile/${platform}/${profile}`,
        headers: {
            'TRN-Api-Key': process.env.TRN_APEX_KEY
        }
    });
};

//Overwatch API
services.getOverwatchStats = ({ platform, region, battletag }) => {
    return axios.get(`https://ow-api.com/v1/stats/${platform}/${region}/${battletag}/profile`);
};

//Rainbow6 API

services.getRainbowSixStats = ({ username, platform, type }) => {
    return axios({
        method: "GET",
        url: `https://api2.r6stats.com/public-api/stats/${username}/${platform}/${type}`,
        headers: {
            'Authorization': 'Bearer ' + process.env.R6STATS_KEY
        }
    })
}

module.exports = services;