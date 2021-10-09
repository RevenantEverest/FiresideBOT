const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("ready", () => require('./controllers/DiscordEvents/onReady')(bot));
bot.on("error", (err) => require('./controllers/DiscordEvents/onError')(bot, err));

module.exports = bot;