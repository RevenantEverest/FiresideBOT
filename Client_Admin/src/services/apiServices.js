import axios from 'axios';
import env from '../env';
const services = {};

services.getCommandLogs = () => {
    return axios.get(`${env.API}/commands/logs`)
};

services.getTopGuildsToday = () => {
    return axios.get(`${env.API}/commands/logs/top/guild/today`)
};

services.getTopGuildsMonth = () => {
    return axios.get(`${env.API}/commands/logs/top/guild/month`)
};

services.getTopCommandsToday = () => {
    return axios.get(`${env.API}/commands/logs/top/command/today`)
};

services.getTopCommandsMonth = () => {
    return axios.get(`${env.API}/commands/logs/command/month`)
};

export default services;