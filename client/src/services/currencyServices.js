import axios from 'axios';
const services = {};

/* General Currency Settings */

services.getSettings = (data) => {
  return axios.get(`/currency/settings/guild_id/${data}`);
};

services.updateSettings = (data) => {
  return axios({
    method: 'PUT',
    url: '/currency/settings',
    data: {
      guild_id: data.guild_id,
      currency_name: data.currency_name,
      currency_increase_rate: data.currency_increase_rate
    }
  })
};

/* Discord Currency Routes */

services.getByGuildId = (data) => {
  axios.get(`/currency/discord/guild_id/${data}`);
};

export default services;
