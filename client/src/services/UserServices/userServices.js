import axios from 'axios';
import env from '../env';
const services = {};

services.getUsers = (data) => {
    return axios.get(`${env.API}/users`);
};
  
services.getUserById = (data) => {
    return axios.get(`${env.API}/users/info/${data}`);
};
  
services.getUserSettings = (data) => {
    return axios.get(`${env.API}/users/settings/${data}`);
};
  
services.updateUserSettings = (data) => {
    return axios({
      method: 'PUT',
      url: `${env.API}/users/settings`,
      data: {
        user_id: data.user_id,
        prefix: data.prefix
      }
    });
};

export default services;