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

services.randomCutePics = () => {
    return axios({
        method: 'GET',
        url: `https://api.ksoft.si/images/random-aww`,
        headers: {
            'Authorization': 'NANI ' + process.env.KSOFT_API_KEY
        }
    })
};

services.randomNSFW = () => {
    return axios({
        method: 'GET',
        url: `https://api.ksoft.si/images/random-nsfw`,
        headers: {
            'Authorization': 'NANI ' + process.env.KSOFT_API_KEY
        }
    })
};

services.randomMeme = () => {
    return axios({
        method: 'GET',
        url: `https://api.ksoft.si/images/random-meme`,
        headers: {
            'Authorization': 'NANI ' + process.env.KSOFT_API_KEY
        }
    })
};

module.exports = services;