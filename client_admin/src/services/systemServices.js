import axios from 'axios';
import env from '../env';
const services = {};

services.restart = () => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/system/restart`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.restartService = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/system/restart/service/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.stop = () => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/system/stop`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.stopService = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/system/stop/service/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.start = () => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/system/start`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.startService = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/system/start/service/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getProcessInfo = () => {
    return axios({
        method: "GET",
        url: `${env.API}/admin/system/process/info`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;