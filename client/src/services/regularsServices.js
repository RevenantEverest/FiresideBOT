import axios from 'axios';
import env from '../env';
const services = {};

services.getRegulars = (data) => {
    return axios.get('/regulars');
};
  
services.getRegularsByChannel = (data) => {
    return axios.get(`${env.API}/regulars/channel/${data}`);
};
  
services.addRegular = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/regulars`,
      data: {
        channel: data.channel,
        regular_username: data.regular_username
      }
    });
};
  
services.deleteRegular = (data) => {
    return axios.delete(`${env.API}/regulars/regular_id/${data}`);
};

export default services;