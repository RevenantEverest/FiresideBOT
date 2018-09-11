const axios = require('axios');
const services = {};

services.getSongs = (data) => {
  return axios.get(`http://localhost:3001/songs/playlist/${data}`);
}

services.getPlaylist = (data) => {
  return axios.get(`http://localhost:3001/playlists/playlistName/${data}`);
}

module.exports = services;
