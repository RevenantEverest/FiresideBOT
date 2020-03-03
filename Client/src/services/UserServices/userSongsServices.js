import axios from 'axios';
import env from '../../env';
const services = {};

services.songInfo = (data) => {
    return axios.get(`${env.API}/songs/info/${data}`);
};
  
services.getPlaylistSongInfo = (data) => {
    return axios.get(`${env.API}/user/songs/playlist/${data}`);
};
  
services.addSong = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/user/songs`,
      data: {
        playlist_id: data.playlist_id,
        request: data.request
      }
    });
};
  
services.removeSong = (data) => {
    return axios.delete(`${env.API}/user/songs/song_id/${data}`)
};

export default services;