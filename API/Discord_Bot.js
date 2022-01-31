const config = require('./config/config');
const Discord = require('discord.js');
const bot = new Discord.Client();
const { AutoPoster } = require('topgg-autoposter');
const ap = process.env.ENVIRONMENT !== "DEV" ? AutoPoster(process.env.TOPGG_TOKEN, bot) : null;

const chalk = require('chalk');

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

        if(process.env.ENVIRONMENT !== "DEV") 
            return bot.channels.resolve("543862697742172179").send(embed);
    });

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff9900).setTitle("API Ready").setFooter(await dateUtils.getDate());

    if(process.env.ENVIRONMENT !== "DEV") 
        return bot.channels.resolve("543862697742172179").send(embed);
});

bot.on("error", async () => {
    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR - API").setFooter(await dateUtils.getDate());

    return bot.channels.resolve("543862697742172179").send(embed);
});

/* Top.gg AutoPoster events */
if(ap) {
    ap.on("posted", async () => {
        let embed = new Discord.MessageEmbed();
        embed.setColor(0xff9900).setTitle("API Ready").setFooter(await dateUtils.getDate());

        if(process.env.ENVIRONMENT === "DEV")
            return console.log(chalk.hex('#ff9900')("[LOG]") + " Top.gg Stats Posted!")
        else 
            return bot.channels.resolve("543862697742172179").send(embed);
    });

    ap.on("error", async (err) => {
        let embed = new Discord.MessageEmbed();
        embed.setColor(0xff0000).setTitle("CLIENT ERROR - API").setFooter(await dateUtils.getDate());

        console.error(chalk.hex('#ff9900')("[ERROR]") + " Top.gg AutoPoster Error", err);

        if(process.env.ENVIRONMENT !== "DEV")
            return bot.channels.resolve("543862697742172179").send(embed);
    });
};

module.exports = bot;