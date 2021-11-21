import axios from 'axios';
import env from '../../environment';
const services = {};

services.login = (data) => {
    return axios({
        method: 'POST',
        url: `${env.API}/login/discord/token`,
        data: {
            code: data
        }
    });
};
  
services.getUserData = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/login/discord/user/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.verify = (token) => {
    return axios({
        method: "POST",
        url: `${env.API}/verify`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

export default services;