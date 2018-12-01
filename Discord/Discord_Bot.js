const config = require('../config/config');
const Discord_Bot = new config.Discord.Client();
const Discord_Commands = require('./commands/Discord_Commands');
const guildsController = require('./controllers/guildsController');
const guildsDB = require('../models/GuildModels/guildsDB');
const currency = require('./commands/currency/currency');
let PREFIX = '';

// Called When Bot Starts
Discord_Bot.on("ready", () => {
    Discord_Bot.user.setActivity("The Campfire | ?help", {type: "WATCHING"});
    setInterval(() => { config.Discord_Users_Count = Discord_Bot.users.size; }, 5000);
});

// Called When Bot Joins Guild
Discord_Bot.on("guildCreate", (guild) => guildsController.saveGuild(guild));

// Called When Bot Get Removed
Discord_Bot.on("guildDelete", (guild) => guildsController.removeGuild(guild));

// Called Message Is Sent In Guild
Discord_Bot.on("message", (message) => {
  if(message.author.equals(Discord_Bot.user)) return;
  if(message.channel.type === 'dm') return;
  currency.handleCurrency(message);
  if(message.channel.type === 'text')
    guildsDB.findPrefix(message.guild.id)
      .then(prefix => {
        PREFIX = prefix.prefix;
        if(!message.content.startsWith(PREFIX)) return;

        let args = message.content.substring(PREFIX.length).split(" ");

        Discord_Commands.commands(PREFIX, message, args, Discord_Bot);
      })
      .catch(err => console.log(err));
});

module.exports = Discord_Bot;
