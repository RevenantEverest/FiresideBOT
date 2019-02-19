const Discord = require('discord.js');

module.exports = {
    handleOnVote(bot, dbl, vote) {
        let embed = new Discord.RichEmbed();
        embed
        .addField('**Vote Received**', 'Thank you for your vote!')
        .setColor(0xffcc00)
        bot.users.get(vote.user).send(embed);
    }
}