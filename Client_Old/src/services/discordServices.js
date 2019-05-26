import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getDiscordUserSize = (data) => {
  return axios.get(`${apiConfig}/discord/bot/users/size`);
};

services.getUserInfo = (data) => {
  return axios.get(`${apiConfig}/discord/user/info/${data}`);
};

services.getUserGuilds = (data) => {
  return axios.get(`${apiConfig}/discord/guilds/${data}`);
};

services.getGuildInfo = (data) => {};

export default services;
