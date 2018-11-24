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
      guild_id: data.guild_id
    }
  });
}

module.exports = services;
