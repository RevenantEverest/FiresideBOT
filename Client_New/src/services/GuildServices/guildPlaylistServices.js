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
      }
    })
};
  
services.getPlaylistByGuildId = (data) => {
    return axios.get(`${env.API}/guild/playlists/guild/${data}`);
};

export default services;