const config = require('.././config/config');
const PREFIX = '?';

let fortunes = [
  "Yes",
  "No",
  "Maybe",
  "Fuck You",
  "If you believe hard enough",
  "Try asking again",
  "Kill Yourself",
  "Sure",
  "Fair Enough",
  "Please stop",
  "Incorrect",
  "You got it",
  "Mhm"
];

//Command Imports
const musicCommands = require('./music/play');

module.exports = {
  commands(message) {
    if(!message.content.startsWith(PREFIX)) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    if(!config.servers[message.guild.id]) config.servers[message.guild.id] = {
      queue: []
    };

    let server = config.servers[message.guild.id]

    switch (args[0].toLowerCase()) {
      case "ping":
        message.channel.send("pong")
        break;

      case "8ball":
        if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.send("Ask a question.");
        break;

      case "dice":
        message.channel.send('You rolled a ' + (Math.floor(Math.random() * 20)));
        break;

      //Music Commands

      case "play" || "skip" || "stop":
        musicCommands.commands(message, args, server)
        break;
      default:
        message.channel.send("Not a valid command");
        break;
    }
  }
}
