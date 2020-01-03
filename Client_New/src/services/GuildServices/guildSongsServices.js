import axios from 'axios';
import env from '../env';
const services = {};

services.getPlaylistSongInfo = (data) => {
    return axios.get(`${env.API}/guild/songs/playlist/${data}`)
};
  
services.addSong = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/guild/songs`,
      data: {
        playlist_id: data.playlist_id,
        link: data.link,
      }
    });
};
  
services.deleteSong = (data) => {
    return axios.delete(`${env.API}/guild/songs/song_id/${data}`);
};

export default services;