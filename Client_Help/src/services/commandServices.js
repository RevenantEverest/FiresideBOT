import axios from 'axios';
import env from '../env';
const services = {};

services.getCommands = async () => {
    return axios.get(`${env.API}/commands`);
};

export default services;