import axios from 'axios';
import env from '../env';
const services = {};

services.getDiscordUserSize = (data) => {
    return axios.get(`${env.API}/discord/bot/users/size`);
};
  
services.getUserInfo = (data) => {
    return axios.get(`${env.API}/discord/user/info/${data}`);
};
  
services.getUserGuilds = (data) => {
    return axios.get(`${env.API}/discord/guilds/${data}`);
};
  
services.getGuildInfo = (data) => {};

export default services;