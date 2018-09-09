const axios = require('axios');
const services = {};

services.getSongs = (data) => {
  return axios.get('http://localhost:3001/songs/1');
}

module.exports = services;
