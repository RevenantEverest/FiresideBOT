const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const bot = new Commando.Client();

const key = require('./secret')

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('text-commands', 'Text-Commands');
bot.registry.registerGroup('social-media', 'Social-Media');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');


bot.on('message', (message) => {

  if(message.content == 'ping'){
    message.reply('pong')
  }
})

bot.login(key.botKey)
