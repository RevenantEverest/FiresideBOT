const Discord = require('discord.js');
const Discord_Bot = new Discord.Client();

Discord_Bot.on("ready", () => require('./controllers/DiscordEvents/onReady')(Discord_Bot));
Discord_Bot.on("error", (err) => require('./controllers/DiscordEvents/onError')(Discord_Bot, err));

module.exports = Discord_Bot;