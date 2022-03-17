const Discord = require('discord.js');
const chalk = require('chalk');
const twitchTokensController = require('../twitchTokensController');
const { dates } = require("../../utils");

const config = require('../../config/config');
const customCommandsChecker = require('../customCommandsChecker');

async function setBotActivity(bot) {
    const activities = [
        {value: "The Campfire | ?help", type: "WATCHING"},
        {value: `Serving ${config.environment.users.toLocaleString()} Users`, type: "PLAYING"},
        {value: `Serving ${bot.guilds.cache.array().length.toLocaleString()} Servers`, type: "PLAYING"},
        {value: "help.firesidebot.com", type: "PLAYING"},
        {value: config.environment.version, type: "PLAYING"}
    ];
    let RNG = Math.floor(Math.random() * activities.length)
    bot.user.setActivity(activities[RNG].value, {type: activities[RNG].type})
};

module.exports = async (bot, getCommands) => {

    getCommands();

    if(!config.accessTokens.twitch) 
        twitchTokensController.getToken(sendTokenSetEmbed);
    
    bot.user.setActivity("The Campfire | ?help", {type: "WATCHING"});
    setInterval(() => setBotActivity(bot), 7200000);

    setInterval(() => {
        config.environment.users = 0;
        bot.guilds.cache.array().forEach(el => config.environment.users += el.memberCount);
    }, 5000);

    customCommandsChecker(bot);

    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#00ff00')('[LOG]') +' FiresideBOT Ready');

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff9900).setTitle("FiresideBOT Ready").setFooter(await dates.getDate());

    bot.channels.resolve("543862697742172179").send(embed);

    async function sendTokenSetEmbed() {
        if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff9900')('[LOG]') +' Discord Tokens Set');

        let embed = new Discord.MessageEmbed();
        embed.setColor(0xff9900).setTitle("Discord Tokens Set").setFooter(await dates.getDate());

        bot.channels.resolve("543862697742172179").send(embed);
    }
}