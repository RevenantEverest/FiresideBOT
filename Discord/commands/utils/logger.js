const loggerServices = require('../services/loggerServices');
let d = new Date();
let date = d;

module.exports = {
  logCommand(message, args, logMessage) {
    loggerServices.commandLogger({
      command: args[0].toLowerCase(),
      args: args.join(" "),
      message: logMessage,
      user_id: message.author.id,
      guild_id: message.guild.id,
      log_date: date
    })
    .catch(err => console.log(err));
  },
  logError(message, args, error, logMessage) {
    loggerServices.commandErrorLogger({
      command: args[0].toLowerCase(),
      args: args.join(" "),
      message: logMessage,
      error: error,
      user_id: message.author.id,
      guild_id: message.guild.id,
      log_date: date
    })
    .catch(err => console.log(err));
  }
};
