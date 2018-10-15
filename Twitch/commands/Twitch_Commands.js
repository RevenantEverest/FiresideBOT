const config = require('../.././config/config');
const PREFIX = '?';

//Services Imports
const pokemonServices = require('./services/pokemonServices');
const queueDB = require('../.././models/queueDB');

//Component Imports
const fortunes = require('./fortunes');

//Command Imports
const playCommands = require('./music/play');
const mathCommands = require('./math/math');
const rouletteCommands = require('./roulette/roulette');
const pokemonCommands = require('./pokemon/pokemon');

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
        rouletteCommands.roulette(channel, message, args, bot);
        break;
      case "play":
        playCommands.play(channel, message, args, bot);
        break;
      case "math":
        mathCommands.randomMath(channel, userstate, message, args, self, bot);
        break;
      case "pokemon":
        pokemonCommands.getPokemon(channel, userstate, message, args, bot);
        break;
      case "rng":
        if(args[1] && parseInt(args[1], 10)) return bot.say(channel, RNG(args[1]).toString());
        return bot.say(channel, RNG(10).toString());
        break;
      case "test":
        // console.log(userstate);
        // if(!userstate.badges) return bot.say(channel, 'You are not a Mod');
        // if(userstate.badges.subscriber === '0') return bot.say(channel, 'You are not a Mod, but you are a subscriber!');
        // if(userstate.badges.moderator === '1' || userstate.badges.broadcaster === '1') return bot.say(channel, "You are Mod");
        // console.log(userstate);
        // console.log(channel);
        queueDB.findByChannel(channel)
        .then(results => {
          console.log(results);
        })
        .catch(err => console.log(err));
        break;
      default:
        break;
    }
  }
}
