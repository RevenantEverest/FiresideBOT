import axios from 'axios';
import env from '../../environment';
const services = {};

services.getTopCommandsToday = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/top/today`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getTopCommandsThisMonth = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/top/month`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getCommandsOvertime = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/overtime`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getCommandsToday = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/today`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getCommandsThisWeek = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/week`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getCommandsThisMonth = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/month`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

export default services;