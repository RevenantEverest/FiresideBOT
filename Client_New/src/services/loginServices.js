import axios from 'axios';
import env from '../env';
const services = {};

services.handleLogin = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/login/discord/token`,
      data: {
        code: data
      }
    })
};
  
services.getUserData = (data) => {
    return axios.get(`${env.API}/login/discord/user/${data}`);
};
  
services.logout = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/login/discord/logout`,
      data: {
        discord_id: data
      }
    });
};

export default services;