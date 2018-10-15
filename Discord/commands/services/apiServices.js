const axios = require('axios');
const services = {};

services.getUserSongs = (data) => {
  return axios.get(`http://localhost:3001/user/songs/playlist/${data}`);
};

services.getUserPlaylist = (data) => {
  return axios.get(`http://localhost:3001/user/playlists/playlistName/${data}`);
};

services.getPrefix = (data) => {
  return axios.get(`http://localhost:3001/users/settings/${data}`)
};

module.exports = services;
