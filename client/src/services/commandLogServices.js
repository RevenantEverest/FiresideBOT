import axios from 'axios';
import env from '../env';
const services = {};

services.getGuildLogs = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getTopCommandsTodayByGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}/top/command/today`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getTopCommandsMonthByGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}/top/command/month`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsOvertimeByGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}/overtime`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsMonthByGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}/month`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsWeekByGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}/week`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsTodayByGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/logs/guild_id/${data}/today`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;