import axios from 'axios';
import env from '../env';
const services = {};

services.index = () => {
    return axios({
        method: "GET",
        url: `${env.API}/admin/servers/array`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;