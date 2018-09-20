const config = require('../.././config/config');
const PREFIX = '?';

//Services Imports
const pokemonServices = require('./services/pokemonServices');

//Component Imports
const fortunes = require('./fortunes');

//Command Imports
const playCommands = require('./music/play');

function RNG(num) {
  return Math.floor(Math.random() * num);
}

module.exports = {
  commands(channel, userstate, message, self, bot) {

    let args = message.substring(PREFIX.length).split(" ");

    if(!message.startsWith(PREFIX)) return;

    switch(args[0].toLowerCase()) {
      case "ping":
        bot.say(channel, "Pong")
        break;
      case "8ball":
        if(!args[1]) return bot.say("You need to ask a question.");
        bot.say(channel, fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;
      case "roulette":
        if(RNG(6) === 4) bot.say(channel, "You died.");
        else bot.say(channel, "You survived!")
        break;
      case "play":
        playCommands.play(channel, message, args, bot);
        break;
      case "math":
        if(!args[1] || !args[2]) return bot.say(channel, "Need 2 numbers for math");
        if(RNG(3) === 1) return bot.say(channel, `${args[1]} + ${args[2]} = ${(parseInt(args[1], 10) + parseInt(args[2], 10))}`);
        if(RNG(3) === 2) return bot.say(channel, `${args[1]} * ${args[2]} = ${(parseInt(args[1], 10) * parseInt(args[2], 10))}`);
        if(RNG(3) === 3) return bot.say(channel, `${args[1]} / ${args[2]} = ${(parseInt(args[1], 10) / parseInt(args[2], 10))}`);
        break;
      case "pokemon":
        pokemonServices.getPokemon(RNG(400))
          .then(pokemon => { bot.say(channel, pokemon.data.name) })
          .catch(err => console.log(err));
        break;
      case "test":
        // if(!userstate.badges) return bot.say(channel, 'You are not a Mod');
        // if(userstate.badges.subscriber === '0') return bot.say(channel, 'You are not a Mod, but you are a subscriber!');
        // if(userstate.badges.moderator === '1' || userstate.badges.broadcaster === '1') return bot.say(channel, "You are Mod");
        console.log(userstate);
        break;
      default:
        break;
    }
  }
}
