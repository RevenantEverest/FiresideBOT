const config = require('../config/config');
const Twitch_Bot = new config.TMI.client(config.Twitch_Bot_Options);
const Twitch_Commands = require('./commands/Twitch_Commands');

Twitch_Bot.on('chat', (channel, userstate, message, self) => {
  if(self) return;
  Twitch_Commands.commands(channel, userstate, message, self, Twitch_Bot);
});

module.exports = Twitch_Bot;