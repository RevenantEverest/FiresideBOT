import axios from 'axios';
import env from '../env';
const services = {};

services.addGuildPlaylist = (data) => {
    return axios({
        method: 'POST',
        url: `${env.API}/guild/playlists`,
        data: {
            guild_id: data.guild_id,
            guild_name: data.guild_name,
            name: data.name
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    })
};
  
services.getPlaylistByGuildId = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/playlists/guild/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;