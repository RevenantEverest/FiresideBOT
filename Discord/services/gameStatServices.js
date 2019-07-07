const axios = require('axios');
const services = {};

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
};

module.exports = services;