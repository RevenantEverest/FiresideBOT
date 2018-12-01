const axios = require('axios');
const services = {};

services.apiLogger = (data) => {
  return axios({
    method: 'POST',
    url: `http://localhost:3002/log/api`,
    data: {
      route: data.route,
      message: data.message,
      status_code: data.status_code,
      log_date: data.log_date
    }
  });
};

services.apiErrorLogger = (data) => {
  return axios({
    method: 'POST',
    url: `http://localhost:3002/error/api`,
    data: {
      route: data.route,
      message: data.message,
      status_code: data.status_code,
      log_date: data.log_date
    }
  });
}

module.exports = services;
