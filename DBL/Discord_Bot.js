const Discord = require('discord.js');
const Discord_Bot = new Discord.Client();
const DBL = require('dblapi.js');
let DBL_Client = new DBL(process.env.DBL_TOKEN, { statsInterval: 21600000 }, Discord_Bot);

Discord_Bot.on("ready", () => require('./controllers/DiscordEvents/onReady')(Discord_Bot));
Discord_Bot.on("error", (err) => require('./controllers/DiscordEvents/onError')(Discord_Bot, err));

DBL_Client.on('posted', () => require('./controllers/DBL_Events/onPosted')(Discord_Bot));
DBL_Client.on('error', (err) => require('./controllers/DBL_Events/onError')(Discord_Bot, err));

module.exports = Discord_Bot;