const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const bot = new Commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login('NDIzOTAxMDY0MjM2ODkyMTYx.DYxEJQ._lVwLevm9SSLDKkEyYlofExavGo')

bot.on('message', (message) => {
  if(message.content == 'fuck you' || message.content == 'Fuck you'){
    message.reply('Yea fuck the irish')
  }
})
