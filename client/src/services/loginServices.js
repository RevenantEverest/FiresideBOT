import axios from 'axios';
const services = {};

services.getUserData = (data) => {
  return axios.get(`/login/discord/user/${data}`);
};

export default services;
