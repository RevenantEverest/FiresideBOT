const axios = require('axios');
const services = {};

services.apiLogger = (data) => {
  /* Write to a log file */
};

services.userLogger = (data) => {
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
    url: 'http://localhost:3002/user',
    data: {
      discord_id: data.discord_id,
      discord_username: data.discord_username,
      message: data.message,
      date: currentDate
    }
  })
};

module.exports = services;
