import axios from 'axios';
import apiConfig from '../../apiConfig';
const services = {};

services.getGuilds = (data) => {
  return axios.get(`${apiConfig}/guilds`);
}

services.checkForGuild = (data) => {
  return axios.get(`${apiConfig}/guilds/check/${data}`);
};

services.getGuildInfo = (data) => {
  return axios.get(`${apiConfig}/guilds/info/${data}`);
};

/* ======== SETTINGS ======== */

services.getGuildSettings = (data) => {
  return axios.get(`${apiConfig}/guilds/settings/${data}`);
};

services.updateSettings = (data) => {
  return axios({
    method: 'PUT',
    url: `${apiConfig}/guilds/settings`,
    data: {
      guild_id: data.guild_id,
      prefix: data.prefix
    }
  })
};

export default services;
