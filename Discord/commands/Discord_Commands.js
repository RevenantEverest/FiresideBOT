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
const serverPlaylist = require('./music/serverPlaylist');
const queue = require('./music/queue');
const promote = require('./music/promote');
const delSong = require('./music/delSong');
const clear = require('./music/clear');
const volume = require('./music/volume');

//Poll Commands
const poll = require('./poll/poll');
const pokemonCommands = require('./pokemon/pokemon');

const rustPasta = require('./copyPasta/rustPasta');

const help = require('./help/help');

module.exports = {
  commands(message, args) {
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

      case "ping":
        message.channel.send("pong");
        break;

      case "8ball":
        if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.send("Ask a question.");
        break;

      case "dice":
        dice.rollDice(message, args, server);
        break;

      //Poll Commands
      case "poll":
        if(!args[1]) return message.channel.send("No Poll Question Specified.");
        // TODO: Check if a poll is active
        break;
      case "newpoll":
        poll.pollname(message, args, server);
        break;
      case "pollanswer":
        poll.pollanswer(message, args, server);
        break;
      case "sendpoll":
        poll.sendPoll(message, args, server);
        break;
      case "vote":
        poll.vote(message, args, server);
        break;
      case "delpoll":
      poll.deletePoll(message, args, server);
        break;

      //Music Commands
      case "play":
        play.play(message, args, server);
        break;
      case "pause":
        pauseResume.handlePause(message, args, server);
        break;
      case "resume":
        pauseResume.handleResume(message, args, server);
        break;
      case "playnext":
        playNext.playNext(message, args, server);
        break;
      case "queue":
        message.channel.send(queue.queue(message, args, server));
        break;
      case "currentsong":
        message.channel.send(queue.showCurrentSong(message, args, server));
        break;
      case "playlist":
        playlist.playlist(message, args, server);
        break;
      case "serverplaylist":
        serverPlaylist.serverPlaylist(message, args, server);
        break;
      case "promote":
        promote.promote(message, args, server);
          break;
      case "delsong":
        delSong.delsong(message, args, server);
        break;
      case "skip":
        if(server.dispatcher)
          server.dispatcher.end();
        break;
      case "stop":
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
      case "clear":
        clear.clear(message, args, server);
        break;
      case "volume":
        volume.setVolume(message, args, server);
        break;

      // case "test":
      //   console.log(message.author.username);
      //   break;

      case "help":
        help.sendHelp(message, args, server);
        break;
      //Easter Eggs
      case "pokemon":
        pokemonCommands.getPokemon(message, args, server);
        break;
      case "snakes":
        pokemonCommands.getSnakes(message, args, server);
        break;
      case "rustpasta":
        rustPasta.randomPasta(message, args, server);
        break;
      default:
        message.channel.send("Not a valid command");
        break;
    }
  }
}
