import axios from 'axios';
import env from '../env';
const services = {};

services.getNewGuildMembers = async (data) => {
    return axios.get(`${env.API}/guild/members/new/guild_id/${data}`);
};

export default services;