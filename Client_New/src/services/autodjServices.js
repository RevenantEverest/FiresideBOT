import axios from 'axios';
import env from '../env';
const services = {};

services.getRedirectSettings = (data) => {
    return axios.get(`/autodj/user/${data}`);
};
  
services.updateRedirectSettings = (data) => {
  return axios({
      method: 'PUT',
      url: `${env.API}/autodj/redirect`,
      data: {
        redirect: data.redirect,
        user_id: data.user_id
      }
    });
};
  
services.updateGuildRedirectSettings = (data) => {
  return axios({
      method: 'PUT',
      url: `${env.API}/autodj/guild_id`,
      data: {
        guild_id: data.guild_id,
        user_id: data.user_id
      }
    });
};

export default services;