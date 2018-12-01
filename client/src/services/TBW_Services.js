import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getBannedWords = (data) => {
  return axios.get('/TBW');
};

services.getBannedWordsByChannel = (data) => {
  return axios.get(`${apiConfig}/TBW/channel/${data}`);
};

services.addBannedWords = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/TBW`,
    data: {
      channel: data.channel,
      banned_word: data.banned_word
    }
  });
};

services.removeBannedWords = (data) => {
  return axios.delete(`${apiConfig}/TBW/TBW_id/${data}`)
};

export default services;
