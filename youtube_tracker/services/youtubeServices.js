const axios = require('axios');
const services = {};

services.getChannelPage = (data) => {
    return axios.get(encodeURI(`https://www.youtube.com/channel/${data}`));
};



module.exports = services;