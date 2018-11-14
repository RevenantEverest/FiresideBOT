const config = require('../.././config/config');
let PREFIX = '';

//Services Imports
const apiServices = require('./services/apiServices');

//Component Imports
const fortunes = require('./fortunes');

/* ======== Command Imports ======== */

//Music Commands
const play = require('./music/play');
const pauseResume = require('./music/pauseResume');
const playNext = require('./music/playNext');
const playlist = require('./music/playlist');
const myPlaylists = require('./music/myPlaylists');
const serverPlaylist = require('./music/serverPlaylist');
const queue = require('./music/queue');
const promote = require('./music/promote');
const delSong = require('./music/delSong');
const clear = require('./music/clear');
const volume = require('./music/volume');

//Poll Commands
const poll = require('./poll/poll');
const pokemonCommands = require('./pokemon/pokemon');

//Currency Commands
const checkCurrency = require('./currency/checkCurrency');
const giveCurrency = require('./currency/giveCurrency');

//Gamble Commands
const pokemonBattle = require('./currency/gamble/pokemonBattle');

//Other
const dice = require('./dice/dice');

const rustPasta = require('./copyPasta/rustPasta');

const help = require('./help/sendHelp');

module.exports = {
  commands(PREFIX, message, args, self) {
    if(!config.servers[message.guild.id]) config.servers[message.guild.id] = {
      queue: {
        isPlaying: false,
        queueInfo: [],
        currentSongInfo: {},
        currentSongEmbed: [],
      },
      volume: '100'
    };

    let server = config.servers[message.guild.id];

    switch (args[0].toLowerCase()) {

      case "ping": return message.channel.send("pong"); break;

      case "8ball":
        if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.send("Ask a question.");
        break;

      case "dice": dice.rollDice(message, args, server); break;

      //Poll Commands
      case "newpoll": poll.pollname(message, args, server); break;
      case "pollanswer": poll.pollanswer(message, args, server); break;
      case "sendpoll": poll.sendPoll(message, args, server); break;
      case "vote": poll.vote(message, args, server); break;
      case "delpoll": poll.deletePoll(message, args, server); break;

      //Music Commands
      case "play": play.play(message, args, server); break;
      case "pause": pauseResume.handlePause(message, args, server); break;
      case "resume": pauseResume.handleResume(message, args, server); break;
      case "playnext": playNext.playNext(message, args, server); break;
      case "queue": queue.queue(message, args, server, self); break;
      case "np": message.channel.send(queue.showCurrentSong(message, args, server)); break;
      case "playlist": playlist.playlist(message, args, server); break;
      case "serverplaylist": serverPlaylist.serverPlaylist(message, args, server); break;
      case "promote": promote.promote(message, args, server); break;
      case "delsong": delSong.delsong(message, args, server); break;
      case "skip":
        if(server.dispatcher)
          server.dispatcher.end();
        break;
      case "stop":
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
      case "clear": clear.clear(message, args, server); break;
      case "volume": volume.setVolume(message, args, server); break;

      //Currency Commands
      case "balance": checkCurrency.checkCurrency(message, args, server); break;
      case "give": giveCurrency.giveCurrency(message, args, server); break;

      //Gamble Commands
      case "battle": pokemonBattle.challenge(PREFIX, message, args, server); break;

      //Other
      case "help": help.sendHelp(PREFIX, message, args, server, self); break;
      case "accept": return; break;

      //Easter Eggs
      case "pokemon": pokemonCommands.getPokemon(message, args, server); break;

      default:
        message.channel.send("Not a valid command");
        break;
    }
  }
}