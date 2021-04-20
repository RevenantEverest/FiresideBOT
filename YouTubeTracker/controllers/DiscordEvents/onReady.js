const Discord = require('discord.js');
const chalk = require('chalk');
const utils = require('../../utils');

module.exports = async (bot) => {
    if(process.env.ENVIRONMENT === "DEV") 
        return console.log(chalk.hex('#ff9900')('[LOG]') + ' YouTube-Tracker Ready');

    let embed = new Discord.MessageEmbed();
    let date = await utils.getDate();
    embed.setColor(0xff9900).setTitle("YouTube Tracker Starting up...").setFooter(date);
    bot.channels.resolve("543862697742172179").send(embed);
};