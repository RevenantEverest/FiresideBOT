const Discord = require('discord.js');
const chalk = require('chalk');
const utils = require('../../utils');

module.exports = async (bot, err) => {
    if(process.env.ENVIRONMENT === "DEV") 
        return console.log(chalk.hex('#ff0000')('[ERROR]') + ' CLIENT ERROR', err);

    let embed = new Discord.MessageEmbed();
    let date = await utils.getDate();
    embed.setColor(0xff0000).setTitle("**[CLIENT ERROR]**: YouTube Tracker").setFooter(date);
    bot.channels.resolve("543862697742172179").send(embed);
};