require('dotenv').config();

const axios = require('axios');
const btoa = require('btoa');
const services = {};

services.getToken = (data) => {
  const code = data;
  const creds = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`);
  return axios({
    method: 'POST',
    url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.DISCORD_BACKEND_REDIRECT}`,
    headers: {
      Authorization: `Basic ${creds}`,
    },
  })
};

services.refresh_token = (refresh_token) => {
  return axios({
    method: 'POST',
    url: 'https://discordapp.com/api/oauth2/token',
    data: {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      redirect_uri: process.env.DISCORD_BACKEND_REDIRECT,
      scope: 'guilds identify guilds.join email messages.read'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
