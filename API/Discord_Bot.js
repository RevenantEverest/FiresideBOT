const config = require('./config/config');
const Discord = require('discord.js');
const bot = new Discord.Client();
const utils = require('./utils/utils');

bot.on("ready", async () => {
    setInterval(() => {
        config.info.userCount = 0;
        config.info.guildCount = bot.guilds.array().length;
        bot.guilds.array().forEach(el => {
            config.info.userCount += el.memberCount;
        });
    }, 5000)

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9900).setTitle("API Ready").setFooter(await utils.getDate());

    if(process.env.ENVIRONMENT !== "DEV") bot.channels.get("543862697742172179").send(embed);
});

bot.on("error", async () => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR - API").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
});

module.exports = bot;