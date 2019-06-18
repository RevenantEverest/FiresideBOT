const Discord = require('discord.js');
const chalk = require('chalk');
const utils = require('../utils/utils');

const services = {};

services.handleOnReady = async (bot) => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9900).setTitle("DBL Ready").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};

services.handleOnMessage = async (bot, message) => {};

services.handleOnError = async (bot, err) => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR - DBL").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};

module.exports = services;