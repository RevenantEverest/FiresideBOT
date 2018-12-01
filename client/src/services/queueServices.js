import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getChannelQueue = (data) => {
  return axios.get(`${apiConfig}/queue/channel/${data}`);
};

services.deleteFromQueue = (data) => {
  return axios({
    method: 'DELETE',
    url: `${apiConfig}/queue/info/${data}`
  });
};

export default services;
