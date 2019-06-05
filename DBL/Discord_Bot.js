const server = require('./app');
const Discord = require('discord.js');
const Discord_Bot = new Discord.Client();
const DBL = require('dblapi.js');
const DBL_Options = { 
  statsInterval: 86400000, webhookPort: 3006,
  webhookAuth: process.env.DBL_WEBHOOK_PASSWORD, webhookPath: '/webhook/dbl' ,
  webhookServer: server
};
let DBL_Client = new DBL(process.env.DBL_TOKEN, DBL_Options, Discord_Bot);

const discordEventController = require('./controllers/discordEventController');
const dblEventController = require('./controllers/dblEventController');

// Called When Bot Starts
Discord_Bot.on("ready", () => discordEventController.handleOnReady(Discord_Bot));

// Called When Message Is Sent
Discord_Bot.on("message", (message) => discordEventController.handleOnMessage(Discord_Bot, message));

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