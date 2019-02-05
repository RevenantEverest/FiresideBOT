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
  let currentDate = date.toLocaleString('en-US', options);
  return axios({
    method: 'POST',
    url: 'http://localhost:3002/command',
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

services.commandLogger = (data) => {
  let currentDate = getDate();
};

module.exports = services;
