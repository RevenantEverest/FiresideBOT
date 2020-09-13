import axios from 'axios';
import env from '../env';
const services = {};

services.getBotGuilds = () => {
    return axios({
        method: "GET",
        url: `${env.API}/admin/guilds`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}`}
    });
};

export default services;