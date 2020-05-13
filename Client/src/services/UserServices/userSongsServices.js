import axios from 'axios';
import env from '../../env';
const services = {};

services.songInfo = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/songs/info/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getPlaylistSongInfo = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/user/songs/playlist/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.addSong = (data) => {
    return axios({
        method: 'POST',
        url: `${env.API}/user/songs`,
        data: {
            playlist_id: data.playlist_id,
            request: data.request
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.removeSong = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/user/songs/song_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;