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
  const client_id = process.env.DISCORD_CLIENT_ID;
  const client_secret = process.env.DISCORD_CLIENT_SECRET;
  const redirect_uri = process.env.DISCORD_BACKEND_REDIRECT;
  const scope = 'guilds%20identify%20guilds.join%20email%20messages.read';
  return axios({
    method: 'POST',
    url: `https://discordapp.com/api/oauth2/token?
          grant_type=refresh_token&
          client_id=${client_id}&
          client_secret=${client_secret}&
          scope=${scope}&
          refresh_token=${refresh_token}&
          redirect_uri=${redirect_uri}`,
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
