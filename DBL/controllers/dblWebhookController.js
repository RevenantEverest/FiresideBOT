const Discord = require('discord.js');
const utils = require('../utils/utils');
const colors = [0xffcc00, 0x00ff00, 0xff0066, 0xcc66ff, 0x1affff, 0x009900, 0xcc6699, 0xff6600];
const Discord_Bot = require('../Discord_Bot');

module.exports = {
    async handleVote(req, res, next) {
        console.log(req.body);
        let voteEmbed = new Discord.RichEmbed();
        let logEmbed = new Discord.RichEmbed();

        voteEmbed
        .addField('**Vote Received**', 'Thank you for your vote!')
        .setColor(0xffcc00)

        logEmbed
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .addField("Vote Received", `ID: ${req.body.user}`)
        .setFooter(await utils.getDate())

        Discord_Bot.users.get(req.body.user).send(voteEmbed);
        Discord_Bot.channels.get("539303187342032896").send(logEmbed);
    }
};