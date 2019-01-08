const axios = require('axios');
const services = {};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDate() {
  let date = new Date();
  return(`${weekNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]} || ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
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

module.exports = services;
