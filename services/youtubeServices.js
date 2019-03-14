const axios = require('axios');
const config = require('../config/config');
const KEY = config.Google_Key;
const services = {};



services.youtubeSearch = (data) => {
  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${data}&type=video&key=${process.env.GOOGLE_KEY}`)
}

module.exports = services;
