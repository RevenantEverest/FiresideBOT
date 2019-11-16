const Discord = require('discord.js');
const utils = require('../../utils/utils');

module.exports = async (bot, err) => {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("DBL ERROR").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};