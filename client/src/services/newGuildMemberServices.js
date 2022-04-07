import axios from 'axios';
import env from '../env';
const services = {};

services.getNewGuildMembers = async (data) => {
    return axios.get({
        method: "GET",
        url: `${env.API}/guild/members/new/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;