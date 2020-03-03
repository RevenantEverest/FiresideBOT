import axios from 'axios';
import env from '../env';
const services = {};

services.getGuildLogs = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}`);
};

services.getTopCommandsTodayByGuild = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}/top/command/today`);
};

services.getTopCommandsMonthByGuild = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}/top/command/month`);
};

services.getCommandsOvertimeByGuild = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}/overtime`);
};

services.getCommandsMonthByGuild = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}/month`);
};

services.getCommandsWeekByGuild = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}/week`);
};

services.getCommandsTodayByGuild = (data) => {
    return axios.get(`${env.API}/commands/logs/guild_id/${data}/today`);
};

export default services;