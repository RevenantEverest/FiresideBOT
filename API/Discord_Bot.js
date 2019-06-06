const config = require('./config/config');
const Discord = require('discord.js');
const bot = new Discord.Client();
const DBL = require('dblapi.js');
const DBL_Client = new DBL(process.env.DBL_TOKEN, { statsInterval: 21600000 }, bot);
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

    bot.channels.get("543862697742172179").send(embed);
});

bot.on("error", async () => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR - API").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
});


// Called When Server Count is Posted
DBL_Client.on('posted', async () => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0x00ff00).setTitle("Server Count Posted").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
});

// Called On DBL Error
DBL_Client.on('error', async () => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("DBL ERROR").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
});

module.exports = bot;