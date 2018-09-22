const axios = require('axios');
const services = {};

services.getPokemon = (data) => {
  return axios.get(`http://pokeapi.co/api/v2/pokemon/${data}`);
}

module.exports = services;
