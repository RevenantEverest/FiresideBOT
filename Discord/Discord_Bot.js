const server = require('../app');
const Discord = require('discord.js');
const chalk = require('chalk');
const Discord_Bot = new Discord.Client();
const DBL = require('dblapi.js');
const DBL_Options = { 
  statsInterval: 1800000, webhookPort: 3001, 
  webhookAuth: process.env.DBL_WEBHOOK_PASSWORD, webhookPath: '/webhook/dbl', 
  webhookServer: server 
};
const DBL_Client = new DBL(process.env.DBL_TOKEN, DBL_Options, Discord_Bot);

const discordEventController = require('./controllers/discordEventController');
const dblEventController = require('./controllers/dblEventController');

const fs = require('fs');

Discord_Bot.commands = new Discord.Collection();
Discord_Bot.aliases = new Discord.Collection();
Discord_Bot.config = new Discord.Collection();

const categories = ['Admin', 'Dev', 'Economy', 'Fun', 'GameStats', 'Info', 'Music', 'Other', 'Support'];

/*
    Pulls all files from the command directory
    For each file sets the name in the config from that file as an element in Discord.Collection
    For each file config, takes the aliases in the config and stores them in Discord.Collection
*/
for(let i = 0; i < categories.length; i++) {
  let path = `/commands/${categories[i]}`;
  fs.readdir(`./Discord/${path}`, (err, files) => {
    if(err) console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === 'js');
    if(jsfile.length <= 0) {
      return console.error(chalk.hex('#ff9900')("[LOG]") + " Couldn't find Commands");
    }
    jsfile.forEach((f, i) => {
      let pull = require(`.${path}/${f}`);
      Discord_Bot.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        Discord_Bot.aliases.set(alias, pull.config.name);
      });
    });
  });
};

// Called When Bot Starts
Discord_Bot.on("ready", () => discordEventController.handleOnReady(Discord_Bot));

// Called When Bot Joins Guild
Discord_Bot.on("guildCreate", (guild) => discordEventController.handleOnGuildCreate(Discord_Bot, guild));

// Called When Bot Get Removed
Discord_Bot.on("guildDelete", (guild) => discordEventController.handleOnGuildDelete(Discord_Bot, guild));

// Called When Message Is Sent
Discord_Bot.on("message", (message) => discordEventController.handleOnMessage(Discord_Bot, message));

// Called When New Guild Member is Added
Discord_Bot.on("guildMemberAdd", (member) => discordEventController.handleOnMemberAdd(Discord_Bot, member));

// Called When Guild Memeber is Updated
Discord_Bot.on("guildMemberUpdate", (oldMember, newMember) => discordEventController.handleOnMemberUpdate(Discord_Bot, oldMember, newMember));

// Called When Guild Member Leaves or is Removed
Discord_Bot.on("guildMemberRemove", (member) => discordEventController.handleOnMemberRemove(Discord_Bot, member));

// Called When An Error Occurs
Discord_Bot.on("error", (err) => discordEventController.handleOnError(Discord_Bot, err));

/*
  DBL Events
*/

// Called When Server Count is Posted
DBL_Client.on('posted', () => dblEventController.handleOnPosted(Discord_Bot));

// Called When DBL Webhook is Ready
DBL_Client.webhook.on('ready', (hook) => dblEventController.handleOnReady(Discord_Bot, hook));

// Called When a User Votes on DBL
DBL_Client.webhook.on('vote', (vote) => dblEventController.handleOnVote(Discord_Bot, DBL_Client, vote));

// Called On DBL Error
DBL_Client.on('error', (err) => dblEventController.handleOnError(Discord_Bot, err));

module.exports = Discord_Bot;