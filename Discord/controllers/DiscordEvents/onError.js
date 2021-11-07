const Discord = require('discord.js');
const chalk = require('chalk');
const { dates } = require("../../utils");

module.exports = async (bot, err) => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff0000')('[ERROR]') +' CLIENT ERROR', err);

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR").setFooter(await dates.getDate());

    bot.channels.get("543862697742172179").send(embed);
}; 