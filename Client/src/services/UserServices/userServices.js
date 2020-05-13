import axios from 'axios';
import env from '../../env';
const services = {};

services.getUsers = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/users`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getUserById = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/users/info/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getUserSettings = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/users/settings/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.updateUserSettings = (data) => {
    return axios({
        method: 'PUT',
        url: `${env.API}/users/settings`,
        data: {
            user_id: data.user_id,
            prefix: data.prefix
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;