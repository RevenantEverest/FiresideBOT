import axios from 'axios';
const services = {};

services.getUsers = (data) => {
  return axios.get('/users');
};

services.getUserById = (data) => {
  return axios.get(`/users/info/${data}`);
};

services.getUserSettings = (data) => {
  return axios.get(`/users/settings/${data}`);
};

services.updateUserSettings = (data) => {
  return axios({
    method: 'PUT',
    url: '/users/settings',
    data: {
      user_id: data.user_id,
      prefix: data.prefix
    }
  });
};

export default services;
