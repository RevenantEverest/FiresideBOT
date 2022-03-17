import axios from 'axios';
import env from '../env';
const services = {};

services.getPlaylistSongInfo = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/songs/playlist/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.addSong = (data) => {
    return axios({
        method: 'POST',
        url: `${env.API}/guild/songs`,
        data: {
            playlist_id: data.playlist_id,
            link: data.link,
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.deleteSong = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/guild/songs/song_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;