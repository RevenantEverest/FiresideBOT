import axios from 'axios';
const services = {};

services.getDefaultCommands = (data) => {
 return axios.get('/commands/default')
};

export default services;
