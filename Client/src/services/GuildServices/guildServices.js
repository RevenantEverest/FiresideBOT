import axios from 'axios';
import env from '../../env';
const services = {};

services.getGuilds = (data) => {
    return axios.get(`${env.API}/guilds`);
}
  
services.checkForGuild = (data) => {
    return axios.get(`${env.API}/guilds/check/${data}`);
};
  
services.getGuildInfo = (data) => {
    return axios.get(`${env.API}/guilds/info/${data}`);
};
  
  /* ======== SETTINGS ======== */
  
services.getGuildSettings = (data) => {
    return axios.get(`${env.API}/guilds/settings/guild_id/${data}`);
};
  
services.updateSettings = (data) => {
    return axios({
      method: 'PUT',
      url: `${env.API}/guilds/settings`,
      data: {
        guild_id: data.guild_id,
        prefix: data.prefix
      }
    })
};

export default services;