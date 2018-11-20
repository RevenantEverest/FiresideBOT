import axios from 'axios';
const services = {};

services.getDiscordUserSize = (data) => {
  return axios.get('/discord/bot/info/users/count');
};

export default services;
