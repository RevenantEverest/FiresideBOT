import axios from 'axios';
const services = {};

services.songInfo = (data) => {
  return axios.get(`/songs/info/${data}`);
};

services.getPlaylistSongInfo = (data) => {
  return axios.get(`/songs/playlist/${data}`);
};

services.addSong = (data) => {
  return axios({
    method: 'POST',
    url: '/songs',
    data: {
      playlist_id: data.playlist_id,
      link: data.link
    }
  });
};
export default services;
