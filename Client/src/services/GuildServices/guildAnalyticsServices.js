import axios from 'axios';
import env from '../../env';
const services = {};

services.getTopCommandsToday = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/top/today`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getTopCommandsThisMonth = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/top/month`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsOvertime = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/overtime`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsToday = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/today`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsThisWeek = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/week`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getCommandsThisMonth = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guild/analytics/id/${data}/commands/month`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;