import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getRegulars = (data) => {
  return axios.get('/regulars');
};

services.getRegularsByChannel = (data) => {
  return axios.get(`${apiConfig}/regulars/channel/${data}`);
};

services.addRegular = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/regulars`,
    data: {
      channel: data.channel,
      regular_username: data.regular_username
    }
  });
};

services.deleteRegular = (data) => {
  return axios.delete(`${apiConfig}/regulars/regular_id/${data}`);
};

export default services;
