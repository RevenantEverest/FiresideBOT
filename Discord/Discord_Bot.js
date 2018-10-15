const config = require('../config/config');
const Discord_Bot = new config.Discord.Client();
const Discord_Commands = require('./commands/Discord_Commands');
const guildsDB = require('../models/guildsDB');
const customCommandsDB = require('../models/customCommandsDB');
let PREFIX = '';

// Called When Bot Starts
Discord_Bot.on("ready", () => {
});


// Called When Bot Joins Guild
Discord_Bot.on("guildCreate", (guild) => {
  guildsDB.save({ guild_name: guild.name, guild_id: guild.id })
    .then(() => {
      guildsDB.ifSettingsExist(guild.id)
        .then(settings => {
          if(settings.count === "1") return;
          else if(settings.count === "0") {
            guildsDB.saveDefaultSettings({
              guild_id: guild.id,
              prefix: '?'
            }).then()
          }
        })
    }).catch(err => console.log(err));
});

// Called When Bot Get Removed
Discord_Bot.on("guildDelete", (guild) => {
  guildsDB.destroy(guild.id)
    .then().catch(err => console.log(err));
});

// Called Message Is Sent In Guild
Discord_Bot.on("message", (message) => {
  if(message.author.equals(Discord_Bot.user)) return;
  // console.log(message.author.id);
  guildsDB.findPrefix(message.guild.id)
    .then(prefix => {
      PREFIX = prefix.prefix;
      if(!message.content.startsWith(PREFIX)) return;

      let args = message.content.substring(PREFIX.length).split(" ");

      Discord_Commands.commands(message, args);
    })
    .catch()
});

module.exports = Discord_Bot;
