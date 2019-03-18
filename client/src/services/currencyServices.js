import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

/* General Currency Settings */

services.getSettings = (data) => {
  return axios.get(`${apiConfig}/currency/settings/guild_id/${data}`);
};

services.updateSettings = (data) => {
  return axios({
    method: 'PUT',
    url: `${apiConfig}/currency/settings`,
    data: {
      guild_id: data.guild_id,
      currency_name: data.currency_name,
      currency_increase_rate: data.currency_increase_rate
    }
  })
};

/* Discord Currency Routes */

services.getByGuildId = (data) => {
  axios.get(`${apiConfig}/currency/discord/guild_id/${data}`);
};

export default services;
