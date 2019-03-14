const Discord = require('discord.js');

async function getDate() {
    let date = new Date();
    let options = {
        timezone: 'EST', 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
}

const colors = [0xffcc00, 0x00ff00, 0xff0066];

module.exports = {
    async handleOnVote(bot, dbl, vote) {
        let voteEmbed = new Discord.RichEmbed();
        let logEmbed = new Discord.RichEmbed();
        voteEmbed
        .addField('**Vote Received**', 'Thank you for your vote!')
        .setColor(0xffcc00)

        logEmbed
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .addField("Vote Received", `ID: ${vote.user}`)
        .setFooter(await getDate())

        bot.users.get(vote.user).send(voteEmbed);
        bot.channels.get("539303187342032896").send(logEmbed);

        console.log(vote)
    }
}