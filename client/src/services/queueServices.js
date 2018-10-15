import axios from 'axios';
const services = {};

services.getChannelQueue = (data) => {
  return axios.get(`/queue/channel/${data}`);
};

services.deleteFromQueue = (data) => {
  return axios({
    method: 'DELETE',
    url: `/queue/info/${data}`
  });
};

export default services;
