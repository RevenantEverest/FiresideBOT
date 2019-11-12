const Discord = require('discord.js');
const utils = require('../../utils/utils');

module.exports = async (bot) => {
    if(process.env.ENVIRONMENT === "DEV") return;

    let embed = new Discord.RichEmbed();
    embed.setColor(0x00ff00).setTitle("Server Count Posted").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};