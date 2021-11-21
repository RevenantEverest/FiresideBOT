import axios from 'axios';
import env from '../../environment';
const services = {};

services.addGuildPlaylist = (data, token) => {
    return axios({
        method: 'POST',
        url: `${env.API}/guild/playlists`,
        data: {
            guild_id: data.guild_id,
            guild_name: data.guild_name,
            name: data.name
        },
        headers: { "Authorization": `Bearer ${token}` }
    })
};
  
services.getPlaylistByGuildId = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/playlists/guild/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

export default services;