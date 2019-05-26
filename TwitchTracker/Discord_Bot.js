const Discord = require('discord.js');
const bot = new Discord.Client();
const controller = require('./controllers/discordEventsController');

bot.on("ready", () => controller.handleOnReady(bot));
bot.on("error", (err) => controller.handleOnError(bot, err));

module.exports = bot;