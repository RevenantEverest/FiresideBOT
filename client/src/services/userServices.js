import axios from 'axios';
const services = {};

services.getUsers = (data) => {
  return axios.get('./users');
};

export default services;
