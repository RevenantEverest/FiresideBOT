import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getDiscordUserSize = (data) => {
  return axios.get(`${apiConfig}/discord/bot/info/users/count`);
};

export default services;
