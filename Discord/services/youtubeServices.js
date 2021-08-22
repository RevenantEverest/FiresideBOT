const axios = require('axios');
const config = require('../config/config');
const services = {};



services.youtubeSearch = (data) => {
  return axios.get(encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${data}&type=video&key=${process.env.GOOGLE_KEY}`));
};

services.youtubePlaylistSearch = (data) => {
  let URL = encodeURI(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${data.maxResults}&playlistId=${data.playlist_id}&key=${process.env.GOOGLE_KEY}`);
  if(data.pageToken)
    URL = encodeURI(URL + `&pageToken=${data.pageToken}`);
  return axios.get(URL);
};

services.getChannelPage = (data) => {
  return axios.get(encodeURI(data));
};

module.exports = services;
