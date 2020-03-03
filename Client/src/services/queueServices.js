import axios from 'axios';
import env from '../env';
const services = {};

services.getChannelQueue = (data) => {
    return axios.get(`${env.API}/queue/channel/${data}`);
};
  
services.deleteFromQueue = (data) => {
    return axios({
      method: 'DELETE',
      url: `${env.API}/queue/info/${data}`
    });
};

export default services;