import axios from 'axios';
import apiConfig from '../../apiConfig';
const services = {};

services.getUsers = (data) => {
  return axios.get(`${apiConfig}/users`);
};

services.getUserById = (data) => {
  return axios.get(`${apiConfig}/users/info/${data}`);
};

services.getUserSettings = (data) => {
  return axios.get(`${apiConfig}/users/settings/${data}`);
};

services.updateUserSettings = (data) => {
  return axios({
    method: 'PUT',
    url: `${apiConfig}/users/settings`,
    data: {
      user_id: data.user_id,
      prefix: data.prefix
    }
  });
};

export default services;
