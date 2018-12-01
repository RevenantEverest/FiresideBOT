import axios from 'axios';
import apiConfig from '../../apiConfig';
const services = {};

services.getPlaylistSongInfo = (data) => {
  return axios.get(`${apiConfig}/guild/songs/playlist/${data}`)
};

services.addSong = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/guild/songs`,
    data: {
      playlist_id: data.playlist_id,
      link: data.link,
    }
  });
};

services.deleteSong = (data) => {
  return axios.delete(`${apiConfig}/guild/songs/song_id/${data}`);
};

export default services;
