const axios = require('axios');
const services = {};

services.API_Status = () => { return axios.get('http://localhost:80/status'); }
services.DBL_Status = () => { return axios.get('http://localhost:3006/status'); }
services.Discord_Status = () => { return axios.get('http://localhost:3005/status'); }
services.Logger_Status = () => { return axios.get('http://localhost:3002/status'); }
services.TwitchTracker_Status = () => { return axios.get('http://localhost:4000/status'); }

module.exports = services;