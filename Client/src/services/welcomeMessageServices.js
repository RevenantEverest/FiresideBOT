import axios from 'axios';
import env from '../env';
const services = {};

services.getByGuildId = (data) => {
    return axios.get({
        method: "GET",
        url: `${env.API}/welcome_message/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.save = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/welcome_message`,
        data: {
            message: data.message,
            guild_id: data.guild_id
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
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
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;