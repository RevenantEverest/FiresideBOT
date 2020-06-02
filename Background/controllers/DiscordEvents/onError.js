const Discord = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');
const utils = require('../../commands/utils/utils');

module.exports = async (bot, err) => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff0000')('[ERROR]') +' Background Prcoess Client ERROR', err);

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff0000).setTitle("Background Process Client ERROR").setFooter(moment().format("LLLL") + " EST");

    bot.channels.resolve("543862697742172179").send(embed);
}; 