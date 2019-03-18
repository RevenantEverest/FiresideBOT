import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.handleLogin = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/login/discord/token`,
    data: {
      code: data
    }
  })
};

services.getUserData = (data) => {
  return axios.get(`${apiConfig}/login/discord/user/${data}`);
};

services.logout = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/login/discord/logout`,
    data: {
      discord_id: data
    }
  });
};

export default services;
