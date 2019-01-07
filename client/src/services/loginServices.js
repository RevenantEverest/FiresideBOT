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
  return axios.delete(`${apiConfig}/login/discord/logout/${data}`);
};

export default services;
