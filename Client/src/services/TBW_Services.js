import axios from 'axios';
import env from '../env';
const services = {};

services.getBannedWords = (data) => {
    return axios.get('/TBW');
};
  
services.getBannedWordsByChannel = (data) => {
    return axios.get(`${env.API}/TBW/channel/${data}`);
};
  
services.addBannedWords = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/TBW`,
      data: {
        channel: data.channel,
        banned_word: data.banned_word
      }
    });
};
  
services.removeBannedWords = (data) => {
    return axios.delete(`${env.API}/TBW/TBW_id/${data}`)
};

export default services;