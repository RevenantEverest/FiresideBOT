import axios from 'axios';
import apiConfig from '../../apiConfig';
const services = {};

services.addGuildPlaylist = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/guild/playlists`,
    data: {
      guild_id: data.guild_id,
      guild_name: data.guild_name,
      name: data.name
    }
  })
};

services.getPlaylistByGuildId = (data) => {
  return axios.get(`/guild/playlists/guild/${data}`);
}

export default services;
