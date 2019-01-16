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

module.exports = services;