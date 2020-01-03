import axios from 'axios';
import env from '../env';
const services = {};

/* General Currency Settings */

services.getSettings = (data) => {
    return axios.get(`${env.API}/currency/settings/guild_id/${data}`);
};
  
services.updateSettings = (data) => {
    return axios({
      method: 'PUT',
      url: `${env.API}/currency/settings`,
      data: {
        guild_id: data.guild_id,
        currency_name: data.currency_name,
        currency_increase_rate: data.currency_increase_rate
      }
    })
};
  
  /* Discord Currency Routes */
  
services.getByGuildId = (data) => {
    return axios.get(`${env.API}/currency/discord/guild_id/${data}`);
};

services.deleteRecord = (data) => {
    return axios.delete(`${env.API}/currency/discord/id/${data}`);
};

export default services;