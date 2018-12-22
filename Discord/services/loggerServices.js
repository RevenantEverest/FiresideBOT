const axios = require('axios');
const services = {};

services.commandLogger = (data) => {
  return axios({
    method: 'POST',
    url: 'http://localhost:3002/log/commands',
    data: {
      command: data.command,
      args: data.args,
      message: data.message,
      user_id: data.user_id,
      guild_id: data.guild_id,
      log_date: data.log_date
    }
  });
}

services.commandErrorLogger = (data) => {
  return axios({
    method: "POST",
    ur: '/error/command',
    data: {
      command: data.command,
      args: data.args,
      message: data.message,
      error: data.error,
      user_id: data.user_id,
      guild_id: data.guild_id,
      log_date: data.log_date
    }
  })
}

module.exports = services;
