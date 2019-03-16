const Discord = require('discord.js');
const chalk = require('chalk');
const utils = require('../commands/utils/utils');
const services = {};
const colors = [0xffcc00, 0x00ff00, 0xff0066, 0xcc66ff, 0x1affff, 0x009900, 0xcc6699, 0xff6600];

services.handleOnReady = async (bot, hook) => {
    console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` DBL-Webhook: Listening on port ${hook.port}`)
};

services.handleOnPosted = async (bot) => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff9900')('[LOG]') +' Server Count Posted');

    let embed = new Discord.RichEmbed();
    embed.setColor(0x00ff00).setTitle("Server Count Posted").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};

services.handleOnVote = async (bot, dbl, vote) => {
    // if(process.env.ENVIRONMENT === "DEV") return;

    let voteEmbed = new Discord.RichEmbed();
    let logEmbed = new Discord.RichEmbed();

    voteEmbed
    .addField('**Vote Received**', 'Thank you for your vote!')
    .setColor(0xffcc00)

    logEmbed
    .setColor(colors[Math.floor(Math.random() * colors.length)])
    .addField("Vote Received", `ID: ${vote.user}`)
    .setFooter(await utils.getDate())

    bot.users.get(vote.user).send(voteEmbed);
    bot.channels.get("539303187342032896").send(logEmbed);
};

services.handleOnError = async (bot, err) => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff0000')('[ERROR]') +' DBL ERROR', err);

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("DBL ERROR").setFooter(await getDate());

    bot.channels.get("543862697742172179").send(embed);
};

module.exports = services;