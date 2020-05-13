import axios from 'axios';
import env from '../env';
const services = {};

services.getChannelQueue = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/queue/channel/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.deleteFromQueue = (data) => {
    return axios({
        method: 'DELETE',
        url: `${env.API}/queue/info/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;