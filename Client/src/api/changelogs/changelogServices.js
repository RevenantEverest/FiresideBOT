import axios from 'axios';
import env from '../../environment';
const services = {};

services.getChangeLogs = () => {
    return axios.get(`${env.API}/changelogs`);
};

export default services;