const axios = require('axios');
const fetch = require('node-fetch');
const btoa = require('btoa');
const services = {};
const redirect = 'http://www.firesidebot.com/';
// const redirect = 'http://localhost:3000/';

services.getToken = (data) => {
  const code = data;
  const creds = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`);
  return axios({
    method: 'POST',
    url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    headers: {
      Authorization: `Basic ${creds}`,
    },
  })
};

services.getUserInfo = (data) => {
  return axios({
    method: "GET",
    url: 'https://discordapp.com/api/users/@me',
    headers: {
      Authorization: `Bearer ${data}`
    }
  })
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

module.exports = services;
