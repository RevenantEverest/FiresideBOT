const config = require('../.././config/config');
let PREFIX = '?';

//Services Imports
const apiServices = require('./services/apiServices');

//Component Imports
const fortunes = require('./fortunes');

//Command Imports
const play = require('./music/play');
const queue = require('./music/queue');
const delSong = require('./music/delSong');
const poll = require('./poll/poll');

module.exports = {
  commands(message) {

    if(!message.content.startsWith(PREFIX)) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    if(!config.servers[message.guild.id]) config.servers[message.guild.id] = {
      queue: {
        titles: [],
        links: []
      }
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
      case "playnext":
        play.play(message, args, server);
        break;
      case "queue":
        message.channel.send(queue.queue(message, args, server));
        break;
      case "currentsong":
        message.channel.send(queue.showCurrentSong(message, args, server));
        break;
      case "skip":
        if(server.dispatcher)
          server.dispatcher.end();
        break;
      case "stop":
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
      case "playlist":
        play.play(message, args, server);
        break;
      case "delsong":
        delSong.delsong(message, args, server);
        break;

      case "test":
        console.log(message.guild.id);
        break;
      //Easter Eggs
      default:
        message.channel.send("Not a valid command");
        break;
    }
  }
}
