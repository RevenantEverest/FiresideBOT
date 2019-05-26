import axios from 'axios';
import env from '../env';
const services = {};

services.getDefaultCommands = () => {
  return axios.get(`${env.COMMAND_API}/commands`);
};

export default services;