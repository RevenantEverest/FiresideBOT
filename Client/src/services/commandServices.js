import axios from 'axios';
import env from '../env';
const services = {};

services.getDefaultCommands = () => {
  return axios.get(`${env.API}/commands`);
};

export default services;