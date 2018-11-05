import axios from 'axios';
const services = {};

services.getRegulars = (data) => {
  return axios.get('/regulars');
};

services.getRegularsByChannel = (data) => {
  return axios.get(`/regulars/channel/${data}`);
};

services.addRegular = (data) => {
  return axios({
    method: 'POST',
    url: '/regulars',
    data: {
      channel: data.channel,
      regular_username: data.regular_username
    }
  });
};

services.deleteRegular = (data) => {
  return axios.delete(`/regulars/regular_id/${data}`);
};

export default services;
