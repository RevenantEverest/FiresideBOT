const config = require('./config/config');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("[LOG] FiresideBOT Ready");
    setInterval(() => {
        config.info.userCount = 0;
        config.info.guildCount = bot.guilds.array().length;
        bot.guilds.array().forEach(el => {
            config.info.userCount += el.memberCount;
        });
    }, 5000)
});

bot.on("error", () => {
    console.log("[ERROR] Discord Client Error");
});

module.exports = bot;