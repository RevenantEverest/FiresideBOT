const config = require('../.././config/config');
let PREFIX = '';

//Services Imports
const loggerServices = require('./services/loggerServices');

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

    switch (args[0].toLowerCase()) {

      case "ping":
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        return message.channel.send("pong");
        break;

      case "8ball":
        if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.send("Ask a question.");
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;

      case "dice":
        dice.rollDice(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;

      //Poll Commands
      case "newpoll":
        poll.pollname(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "pollanswer":
        poll.pollanswer(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "sendpoll":
        poll.sendPoll(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "vote":
        poll.vote(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "delpoll":
        poll.deletePoll(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
        break;

      //Music Commands
      case "play":
        play.play(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "pause":
        pauseResume.handlePause(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "resume":
        pauseResume.handleResume(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "playnext":
        playNext.playNext(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "queue":
        queue.queue(message, args, server, self);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "np":
        queue.showCurrentSong(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "playlist":
        playlist.playlist(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "serverplaylist":
        serverPlaylist.serverPlaylist(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "promote":
        promote.promote(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "delsong":
        delSong.delsong(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "skip":
        if(server.dispatcher)
          server.dispatcher.end();
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "stop":
        stop.stop(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "clear":
        clear.clear(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "volume":
        volume.setVolume(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;

      //Currency Commands
      case "balance":
        checkCurrency.checkCurrency(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "give":
        giveCurrency.giveCurrency(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;

      //Gamble Commands
      // case "battle": pokemonBattle.challenge(PREFIX, message, args, server); break;

      //Other
      case "help":
        help.sendHelp(PREFIX, message, args, server, self);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "accept": return; break;

      //Easter Eggs
      case "pokemon":
        pokemonCommands.getPokemon(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;
      case "campfire":
        campfire.craftCampfire(message, args, server);
        loggerServices.commandLogger({command: args[0].toLowerCase(), args: args.join(" "), message: '' , user_id: message.author.id, guild_id: message.guild.id });
        break;

      default:
        message.channel.send("Not a valid command");
        break;
    }
  }
}
