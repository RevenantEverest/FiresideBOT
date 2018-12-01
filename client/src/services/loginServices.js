import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getUserData = (data) => {
  return axios.get(`${apiConfig}/login/discord/user/${data}`);
};

export default services;
