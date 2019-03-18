import axios from 'axios';
import apiConfig from '../../apiConfig';
const services = {};

services.songInfo = (data) => {
  return axios.get(`${apiConfig}/songs/info/${data}`);
};

services.getPlaylistSongInfo = (data) => {
  return axios.get(`${apiConfig}/user/songs/playlist/${data}`);
};

services.addSong = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/user/songs`,
    data: {
      playlist_id: data.playlist_id,
      link: data.link
    }
  });
};

services.deleteSong = (data) => {
  return axios.delete(`${apiConfig}/user/songs/song_id/${data}`)
}
export default services;
