const config = require('../config/config');
const Discord_Bot = new config.Discord.Client();
const guildsController = require('./controllers/guildsController');
const currencyController = require('./controllers/currencyController');
const userSizeController = require('./controllers/userSizeController');
const guildsDB = require('../models/GuildModels/guildsDB');
let PREFIX = '';
const fs = require('fs');

// Called When Bot Starts
Discord_Bot.on("ready", () => {
    Discord_Bot.user.setActivity("The Campfire | ?help", {type: "WATCHING"});
    setInterval(() => {
      userSizeController.getUserSize(Discord_Bot)
    }, 5000);
});

// Called When Bot Joins Guild
Discord_Bot.on("guildCreate", (guild) => guildsController.saveGuild(guild));

// Called When Bot Get Removed
Discord_Bot.on("guildDelete", (guild) => guildsController.removeGuild(guild));

Discord_Bot.commands = new config.Discord.Collection();
Discord_Bot.aliases = new config.Discord.Collection();
Discord_Bot.config = new config.Discord.Collection();

fs.readdir("./Discord/commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === 'js');
  if(jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't find Commands");
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    Discord_Bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      Discord_Bot.aliases.set(alias, pull.config.name);
    });
  });
});

// Called Message Is Sent In Guild
Discord_Bot.on("message", async message => {

  if(message.author.bot || message.channel.type === 'dm') return;
  currencyController.handleCurrency(message);
  guildsDB.findPrefix(message.guild.id)
    .then(prefix => {
      PREFIX = prefix.prefix;
      if(!message.content.startsWith(PREFIX)) return;
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
      
      let args = message.content.substring(PREFIX.length).split(" ");
      let server = config.servers[message.guild.id];

      let commandfile = Discord_Bot.commands.get(args[0].toLowerCase()) || Discord_Bot.commands.get(Discord_Bot.aliases.get(args[0].toLowerCase()));
      if(commandfile) commandfile.run(PREFIX, message, args, server, Discord_Bot);
    })
    .catch(err => console.log(err));
});

Discord_Bot.ws.on('close', (err) => console.log(err));
module.exports = Discord_Bot;
