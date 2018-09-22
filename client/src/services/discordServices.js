import axios from 'axios';
const services = {};

services.getToken = (data) => {
  return axios({
    method: 'POST',
    url: '/login/discord/token',
    data: {
      code: data
    }
  })
};

services.getUserInfo = (data) => {
  return axios({
    method: 'GET',
    url: 'https://discordapp.com/api/users/@me',
    headers: {
      Authorization: `Bearer ${data}`
    }
  });
};

services.getUserGuilds = (data) => {
  return axios({
    method: 'GET',
    url: 'https://discordapp.com/api/users/@me/guilds',
    headers: {
      Authorization: `Bearer ${data}`
    }
  })
};

services.getGuildInfo = (data) => {};

export default services;
