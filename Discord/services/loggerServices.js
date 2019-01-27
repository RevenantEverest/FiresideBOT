const axios = require('axios');
const services = {};

function getDate() {
  let date = new Date();
  let options = {
      timezone: 'EST', 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      hour: 'numeric',
      minute: 'numeric'
  }
  return date.toLocaleString('en-US', options)
}

services.commandLogger = (data) => {
  let currentDate = getDate();
  return axios({
    method: 'POST',
    url: 'http://localhost:3002/log/commands',
    data: {
      command: data.command,
      args: data.args,
      message: data.message,
      user_id: data.user_id,
      guild_id: data.guild_id,
      log_date: currentDate
    }
  });
}

services.commandErrorLogger = (data) => {
  let currentDate = getDate();
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
      log_date: currentDate
    }
  })
}

services.guildAddLogger = (data) => {

}

module.exports = services;
