require('dotenv').config();

const config = require('./config/config');
const bot = new config.Discord.Client();

const commands = require('./commands/commands');

bot.on("message", (message) => {
  if(message.author.equals(bot.user)) return;
  commands.commands(message);
});

bot.login(config.key);
