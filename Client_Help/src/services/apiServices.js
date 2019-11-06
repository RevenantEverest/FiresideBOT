import axios from 'axios';
import env from '../env.js';
const services = {};


services.getCommands = () => {
    return axios.get(`${env.API}/commands`)
};

export default services;