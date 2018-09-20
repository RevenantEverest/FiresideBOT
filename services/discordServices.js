const axios = require('axios');
const fetch = require('node-fetch');
const btoa = require('btoa');
const services = {};

services.getToken = (data) => {
  const code = data;
  const creds = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`);
  return axios({
    method: 'POST',
    url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/`,
    headers: {
      Authorization: `Basic ${creds}`,
    },
  })
}

module.exports = services;
