const Discord = require('discord.js');
const chalk = require('chalk');
const utils = require('../../commands/utils/utils');

const config = require('../../config/config');
const guildsController = require('../guildsController');
const customCommandsChecker = require('../customCommandsChecker');

async function setBotActivity(bot) {
    const activities = [
        {value: "The Campfire | ?help", type: "WATCHING"},
        {value: `Serving ${config.environment.users.toLocaleString()} Users`, type: "PLAYING"},
        {value: `Serving ${bot.guilds.array().length.toLocaleString()} Servers`, type: "PLAYING"},
        {value: "help.firesidebot.com", type: "PLAYING"},
        {value: config.environment.version, type: "PLAYING"}
    ];
    let RNG = Math.floor(Math.random() * activities.length)
    bot.user.setActivity(activities[RNG].value, {type: activities[RNG].type})
};

module.exports = async (bot, getCommands) => {

    getCommands();

    guildsController.checkGuilds(bot)
    
    bot.user.setActivity("The Campfire | ?help", {type: "WATCHING"});
    setInterval(() => {
        setBotActivity(bot);
    }, 7200000);

    setInterval(() => {
        config.environment.users = 0;
        bot.guilds.array().forEach(el => config.environment.users += el.memberCount);
    }, 5000);

    customCommandsChecker(bot);

    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#00ff00')('[LOG]') +' FiresideBOT Ready');

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9900).setTitle("FiresideBOT Ready").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
}