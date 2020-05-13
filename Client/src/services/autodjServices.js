import axios from 'axios';
import env from '../env';
const services = {};

services.getRedirectSettings = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/autodj/user/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.updateRedirectSettings = (data) => {
    return axios({
        method: 'PUT',
        url: `${env.API}/autodj/redirect`,
        data: {
            redirect: data.redirect,
            user_id: data.user_id
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.updateGuildRedirectSettings = (data) => {
    return axios({
        method: 'PUT',
        url: `${env.API}/autodj/guild_id`,
        data: {
            guild_id: data.guild_id,
            user_id: data.user_id
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;