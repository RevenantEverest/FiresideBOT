import axios from 'axios';
import env from '../env';
const services = {};

/* COMMANDS */

services.getCommandLogs = () => {
    return axios.get(`${env.TEST_API}/commands/logs`)
};

services.getCommandsOvertime = () => {
    return axios.get(`${env.TEST_API}/commands/logs/overtime`);
};

services.getTopCommandsMonth = () => {
    return axios.get(`${env.TEST_API}/commands/logs/top/command/month`)
};

services.getCommandsThisWeek = () => {
    return axios.get(`${env.TEST_API}/commands/logs/command/week`)
};

services.getTopCommandsToday = () => {
    return axios.get(`${env.TEST_API}/commands/logs/top/command/today`)
};

/* GUILDS */

services.getTopGuildsMonth = () => {
    return axios.get(`${env.TEST_API}/commands/logs/top/guild/month`)
};

services.getTopGuildsToday = () => {
    return axios.get(`${env.TEST_API}/commands/logs/top/guild/today`)
};



export default services;