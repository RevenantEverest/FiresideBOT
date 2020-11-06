const axios = require('axios');
const config = require('../config/config');
const services = {};



services.youtubeSearch = (data) => {
  return axios.get(encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${data}&type=video&key=${process.env.GOOGLE_KEY}`));
};

services.youtubePlaylistSearch = (data) => {
  return axios.get(encodeURI(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${data}&key=${process.env.GOOGLE_KEY}`));
};

module.exports = services;
