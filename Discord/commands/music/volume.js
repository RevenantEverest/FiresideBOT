const Discord = require('../../../config/config').Discord;

module.exports = {
  setVolume(message, args, server) {
    if(!args[1]) return message.channel.send(`Current Volume: ${server.volume}`);
    if(!this.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid integer value.");
    if(parseInt(args[1], 10) > 100 || parseInt(args[1], 10) <= 0) return message.channel.send("Please select a volume between 1 and 100.");
    server.volume = args[1];
    if(server.dispatcher) {
      if(this.isInteger(parseInt(args[1], 10) / 100)) {
        server.dispatcher.setVolume(parseInt(args[1], 10) / 100);
      }else if(this.isFloat(parseFloat(args[1], 10) / 100)) {
        server.dispatcher.setVolume(parseFloat(args[1], 10) / 100);
      }
    }
    if(args[0] === '') return;
    message.channel.send(`Volume set to: ${args[1]}`);
  },
  isFloat(n) {
    return n === +n && n !== (n|0);
  },
  isInteger(n) {
    return n === +n && n === (n|0)
  }
};
