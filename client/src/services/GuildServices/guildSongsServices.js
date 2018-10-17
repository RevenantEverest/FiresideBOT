import axios from 'axios';
const services = {};

services.getPlaylistSongInfo = (data) => {
  return axios.get(`/guild/songs/playlist/${data}`)
};

services.addSong = (data) => {
  return axios({
    method: 'POST',
    url: '/guild/songs',
    data: {
      playlist_id: data.playlist_id,
      link: data.link,
    }
  });
};

services.deleteSong = (data) => {
  return axios.delete(`/guild/songs/song_id/${data}`);
};

export default services;
