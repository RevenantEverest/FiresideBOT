import axios from 'axios';
const services = {};

services.checkForGuild = (data) => {
  return axios.get(`/guilds/check/${data}`);
};

services.getGuildInfo = (data) => {
  return axios.get(`/guilds/info/${data}`);
};

/* ======== SETTINGS ======== */

services.getGuildSettings = (data) => {
  return axios.get(`/guilds/settings/${data}`);
};

services.updateSettings = (data) => {
  return axios({
    method: 'PUT',
    url: '/guilds/settings',
    data: {
      guild_id: data.guild_id,
      prefix: data.prefix
    }
  })
};

export default services;
