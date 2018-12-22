const axios = require('axios');
const services = {};

services.getPokemon = (data) => {
  return axios.get(`http://pokeapi.co/api/v2/pokemon/${data}`);
}

services.getPokemonSpecies = (data) => {
  return axios.get(`http://pokeapi.co/api/v2/pokemon-species/${data}`);
}

module.exports = services;
