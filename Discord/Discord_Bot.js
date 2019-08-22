const config = require('./config/config');
const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const Discord_Bot = new Discord.Client();

const readmeController = require('./controllers/readmeController');

// Function can't be moved from this file
async function getCommands() {
  Discord_Bot.commands = new Discord.Collection();
  Discord_Bot.aliases = new Discord.Collection();
  Discord_Bot.config = new Discord.Collection();
  
  const categories = ['Admin', 'Dev', 'Config', 'Economy', 'Fun', 'GameStats', 'Info', 'Music', 'Other', 'Playlists', 'Support'];
  
  /*
      Pulls all files from the command directory
      For each file sets the name in the config from that file as an element in Discord.Collection
      For each file config, takes the aliases in the config and stores them in Discord.Collection
  */
  for(let i = 0; i < categories.length; i++) {
    let path = `/commands/${categories[i]}`;
    fs.readdir(`.${path}`, async (err, files) => {
      if(err) console.error(err);
      let jsfile = files.filter(f => f.split(".").pop() === 'js');
      if(jsfile.length <= 0) return console.error(chalk.hex('#ff9900')("[LOG]") + " Couldn't find Commands");
      jsfile.forEach((f, i) => {
        let pull = require(`.${path}/${f}`);
        Discord_Bot.commands.set(pull.config.name, pull);
        config.Discord_Commands.push(pull.config);
        
        pull.config.aliases.forEach(alias => {
          Discord_Bot.aliases.set(alias, pull.config.name);
        });
      });
    });
  }; 

  console.log(chalk.hex('#ff9900')("[LOG]") + " Commands Set");

  // For Loop Doesn't wait to be finished, ReadMe won't properly update without waiting setTimeout
  setTimeout(() => readmeController.write(), 2000);
};

Discord_Bot.on("ready", () => require('./controllers/DiscordEvents/onReady')(Discord_Bot, getCommands));
Discord_Bot.on("message", (message) => require('./controllers/DiscordEvents/onMessage')(Discord_Bot, message));
Discord_Bot.on("error", (err) => require('./controllers/DiscordEvents/onError')(Discord_Bot, err));

Discord_Bot.on("guildCreate", (guild) => require('./controllers/DiscordEvents/Guild/onGuildCreate')(Discord_Bot, guild));
Discord_Bot.on("guildUpdate", (oldGuild, newGuild) => require('./controllers/DiscordEvents/Guild/onGuildUpdate')(Discord_Bot, oldGuild, newGuild));
Discord_Bot.on("guildDelete", (guild) => require('./controllers/DiscordEvents/Guild/onGuildDelete')(Discord_Bot, guild));

Discord_Bot.on("guildMemberAdd", (member) => require('./controllers/DiscordEvents/GuildMember/onGuildMemberAdd')(Discord_Bot, member));
Discord_Bot.on("guildMemberUpdate", (oldMember, newMember) => require('./controllers/DiscordEvents/GuildMember/onGuildMemberUpdate')(Discord_Bot, oldMember, newMember));
Discord_Bot.on("guildMemberRemove", (member) => require('./controllers/DiscordEvents/GuildMember/onGuildMemberRemove')(Discord_Bot, member));

Discord_Bot.on("roleCreate", (role) => require('./controllers/DiscordEvents/Role/onRoleCreate')(Discord_Bot, role));
Discord_Bot.on("roleUpdate", (oldRole, newRole) => require('./controllers/DiscordEvents/Role/onRoleUpdate')(Discord_Bot, oldRole, newRole));
Discord_Bot.on("roleDelete", (role) => require('./controllers/DiscordEvents/Role/onRoleDelete')(Discord_Bot, role));

Discord_Bot.on("emojiCreate", (emoji) => require('./controllers/DiscordEvents/Emoji/onEmojiCreate')(Discord_Bot, emoji));
Discord_Bot.on("emojiUpdate", (oldEmoji, newEmoji) => require('./controllers/DiscordEvents/Emoji/onEmojiUpdate')(Discord_Bot, oldEmoji, newEmoji));
Discord_Bot.on("emojiDelete", (emoji) => require('./controllers/DiscordEvents/Emoji/onEmojiDelete')(Discord_Bot, emoji));

module.exports = Discord_Bot;