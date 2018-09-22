//Services Imports
const pokemonServices = require('../services/pokemonServices');

function RNG(num) {
  return Math.floor(Math.random() * num);
}

module.exports = {
  getPokemon(channel, userstate, message, args, bot) {
    pokemonServices.getPokemon(RNG(400))
      .then(pokemon => {
        let pokemonName = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.replace(pokemon.data.name.charAt(0), "");
        bot.say(channel, pokemonName)
      })
      .catch(err => console.log(err));
  }
}
