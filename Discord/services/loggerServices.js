const axios = require('axios');
const services = {};
const options = {timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'};

services.commandLogger = (data) => {
  let date = new Date();
  let currentDate = date.toLocaleString('en-US', options);
  return axios({
    method: 'POST',
    url: 'http://localhost:3002/command',
    data: { command: data.command, args: data.args, message: data.message, user_id: data.user_id, guild_id: data.guild_id, log_date: currentDate }
  });
};

services.guildLogger = (data) => {
  let date = new Date();
  let currentDate = date.toLocaleString('en-US', options);
  return axios({
    method: 'POST',
    url: 'http://localhost:3002/guild',
    data: { guild_id: data.guild_id, guild_name: data.guild_name, message: data.message, date: currentDate }
  })
};

module.exports = services;
