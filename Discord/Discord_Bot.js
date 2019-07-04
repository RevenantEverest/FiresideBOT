const config = require('./config/config');
const server = require('./app');
const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const Discord_Bot = new Discord.Client();

const discordEventController = require('./controllers/discordEventController');
const readmeController = require('./controllers/readmeController');

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
}

Discord_Bot.on("ready", () => discordEventController.handleOnReady(Discord_Bot, getCommands));
Discord_Bot.on("guildCreate", (guild) => discordEventController.handleOnGuildCreate(Discord_Bot, guild));
Discord_Bot.on("guildDelete", (guild) => discordEventController.handleOnGuildDelete(Discord_Bot, guild));
Discord_Bot.on("message", (message) => discordEventController.handleOnMessage(Discord_Bot, message));

Discord_Bot.on("roleCreate", (role) => discordEventController.handleOnRoleCreate(Discord_Bot, role));
Discord_Bot.on("roleUpdate", (oldRole, newRole) => discordEventController.handleOnRoleUpdate(Discord_Bot, oldRole, newRole));
Discord_Bot.on("roleDelete", (role) => discordEventController.handleOnRoleDelete(Discord_Bot, role));

Discord_Bot.on("emojiCreate", (emoji) => discordEventController.handleOnEmojiCreate(Discord_Bot, emoji));
Discord_Bot.on("emojiUpdate", (oldEmoji, newEmoji) => discordEventController.handleOnEmojiUpdate(Discord_Bot, oldEmoji, newEmoji));
Discord_Bot.on("emojiDelete", (emoji) => discordEventController.handleOnEmojiDelete(Discord_Bot, emoji));

Discord_Bot.on("guildUpdate", (oldGuild, newGuild) => discordEventController(Discord_Bot, oldGuild, newGuild));
Discord_Bot.on("guildMemberAdd", (member) => discordEventController.handleOnMemberAdd(Discord_Bot, member));
Discord_Bot.on("guildMemberUpdate", (oldMember, newMember) => discordEventController.handleOnMemberUpdate(Discord_Bot, oldMember, newMember));
Discord_Bot.on("guildMemberRemove", (member) => discordEventController.handleOnMemberRemove(Discord_Bot, member));

Discord_Bot.on("error", (err) => discordEventController.handleOnError(Discord_Bot, err));

module.exports = Discord_Bot;