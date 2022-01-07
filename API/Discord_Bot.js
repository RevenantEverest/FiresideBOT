const config = require('./config/config');
const Discord = require('discord.js');
const bot = new Discord.Client();
const twitchTokensController = require('./controllers/twitchTokensController');
const { dateUtils } = require('./utils');

bot.on("ready", async () => {
    setInterval(() => {
        config.info.userCount = 0;
        config.info.guildCount = bot.guilds.cache.array().length;
        bot.guilds.cache.array().forEach(el => {
            config.info.userCount += el.memberCount;
        });
    }, 5000);

    twitchTokensController.getToken(async () => {
        let embed = new Discord.MessageEmbed();
        embed.setColor(0xff9900).setTitle("API Tokens Set").setFooter(await dateUtils.getDate());

        if(process.env.ENVIRONMENT !== "DEV") bot.channels.resolve("543862697742172179").send(embed);
    });

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff9900).setTitle("API Ready").setFooter(await dateUtils.getDate());

    if(process.env.ENVIRONMENT !== "DEV") bot.channels.resolve("543862697742172179").send(embed);
});

bot.on("error", async () => {
    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR - API").setFooter(await dateUtils.getDate());

    bot.channels.resolve("543862697742172179").send(embed);
});

module.exports = bot;