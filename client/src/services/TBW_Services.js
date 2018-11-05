import axios from 'axios';
const services = {};

services.getBannedWords = (data) => {
  return axios.get('/TBW');
};

services.getBannedWordsByChannel = (data) => {
  return axios.get(`/TBW/channel/${data}`);
};

services.addBannedWords = (data) => {
  return axios({
    method: 'POST',
    url: '/TBW',
    data: {
      channel: data.channel,
      banned_word: data.banned_word
    }
  });
};

services.removeBannedWords = (data) => {
  return axios.delete(`/TBW/TBW_id/${data}`)
};

export default services;
