const config = require('../.././config/config');
let PREFIX = '';

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
const stop = require('./music/stop');

//Poll Commands
const poll = require('./poll/poll');

//Currency Commands
const checkCurrency = require('./currency/checkCurrency');
const giveCurrency = require('./currency/giveCurrency');

//Gamble Commands
const pokemonBattle = require('./currency/gamble/pokemonBattle');

//Fun
const dice = require('./dice/dice');
const pokemonCommands = require('./pokemon/pokemon');
const campfire = require('./fireside/campfire');

const help = require('./help/sendHelp');

//Command Logger
const log = require('./log');

module.exports = {
  commands(PREFIX, message, args, self) {
    if(!config.servers[message.guild.id]) config.servers[message.guild.id] = {
      queue: {
        isPlaying: false,
        isPaused: false,
        queueInfo: [],
        currentSongInfo: {},
        currentSongEmbed: [],
      },
      volume: '100'
    };

    let server = config.servers[message.guild.id];
    let errorEmbed = new config.Discord.RichEmbed();
    errorEmbed.setColor(0xff0000).addField("Error", "An Error has occured and has been logged");

    switch (args[0].toLowerCase()) {

      case "ping":
        log.logCommand(message, args, ''); //Command Logger
        return message.channel.send("pong");
        break;

      case "8ball":
        if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.send("Ask a question.");
        log.logCommand(message, args, ''); //Command Logger
        break;

      case "dice":
        dice.rollDice(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;

      // //Poll Commands
      // case "newpoll":
      //   poll.pollname(message, args, server);
      //   log.logCommand(message, args, ''); //Command Logger
      //   break;
      // case "pollanswer":
      //   poll.pollanswer(message, args, server);
      //   log.logCommand(message, args, ''); //Command Logger
      //   break;
      // case "sendpoll":
      //   poll.sendPoll(message, args, server);
      //   log.logCommand(message, args, ''); //Command Logger
      //   break;
      // case "vote":
      //   poll.vote(message, args, server);
      //   log.logCommand(message, args, ''); //Command Logger
      //   break;
      // case "delpoll":
      //   poll.deletePoll(message, args, server);
      //   log.logCommand(message, args, ''); //Command Logger
      //   break;

      //Music Commands
      case "play":
        try {
          play.play(message, args, server);
          log.logCommand(message, args, ''); //Command Logger
        }catch(err) {
          message.channel.send()
        }
        break;
      case "pause":
        pauseResume.handlePause(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "resume":
        pauseResume.handleResume(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "playnext":
        playNext.playNext(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "queue":
        queue.queue(message, args, server, self);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "np":
        queue.showCurrentSong(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "playlist":
        playlist.playlist(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "serverplaylist":
        serverPlaylist.serverPlaylist(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "promote":
        promote.promote(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "delsong":
        delSong.delsong(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "skip":
        if(server.dispatcher)
          server.dispatcher.end();
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "stop":
        stop.stop(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "clear":
        clear.clear(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "volume":
        volume.setVolume(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;

      //Currency Commands
      case "balance":
        checkCurrency.checkCurrency(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "give":
        giveCurrency.giveCurrency(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;

      //Gamble Commands
      // case "battle": pokemonBattle.challenge(PREFIX, message, args, server); break;

      //Other
      case "help":
        help.sendHelp(PREFIX, message, args, server, self);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "accept": return; break;

      //Easter Eggs
      case "pokemon":
        pokemonCommands.getPokemon(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;
      case "campfire":
        campfire.craftCampfire(message, args, server);
        log.logCommand(message, args, ''); //Command Logger
        break;

      default:
        message.channel.send("Not a valid command");
        break;
    }
  }
}
