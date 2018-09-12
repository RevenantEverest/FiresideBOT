const config = require('../.././config/config');
const PREFIX = '?';

module.exports = {
  commands(channel, userstate, message, self, bot) {

    let args = message.substring(PREFIX.length).split(" ");

    if(!message.startsWith(PREFIX)) return;

    switch(args[0].toLowerCase()) {
      case "ping":
        bot.say(channel, "Pong")
        break;
      default:
        break;
    }
  }
}
