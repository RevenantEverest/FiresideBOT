import axios from 'axios';
import env from '../env';
const services = {};

services.getByGuildId = (data) => {
    return axios.get(`${env.API}/welcome_message/guild_id/${data}`);
};

services.save = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/welcome_message`,
        data: {
            message: data.message,
            guild_id: data.guild_id
        }
    });
};

services.update = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/welcome_message`,
        data: {
            id: data.id,
            message: data.message,
            guild_id: data.guild_id
        }
    });
};

export default services;