const Discord = require("discord.js");
const utils = require('../commands/utils/utils');
const ticketsController = require('./ticketsController');

const services = {};

async function logError(bot, message, err, errMsg, command) {
    console.error(err);
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xff0000)
    .setTitle("**New Error**")
    .addField("Guild ID:", message.guild.id, true)
    .addField("Guild Name:", message.guild.name, true)
    .addField("Command:", command)
    .addField("Error Message:", errMsg)
    .setFooter(await utils.getDate());

    bot.channels.get(process.env.ENVIRONMENT === "DEV" ? "613146139524333605" : "543862697742172179").send(embed);
    // Log to DB
};

async function handleTicket(bot, message, err, errMsg, command) {
    let messageContent = 
    { 
        content: `**Command:** ${command}\n**Error Message:** ${errMsg}\n**Guild ID:** ${message.guild.id}`, 
        author: message.author
    };
    ticketsController.openTicket(bot, messageContent);
};

module.exports = async (bot, message, err, errMsg, command) => {
    let embed = new Discord.RichEmbed();
    
    embed
    .setColor(0xff0000)
    .addField(errMsg, "An error has occurred. Sorry for the inconvience.\n\nWould you like to open a support ticket?")
    .setFooter(await utils.getDate());
    
    message.channel.send(embed).then(async msg => {
        await msg.react("✅");
        await msg.react("❌");
        
        logError(bot, message, err, errMsg, command);

        const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });

        r_collector.on('collect', async (reaction, user) => {
            embed = new Discord.RichEmbed();
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
            if(reaction.emoji.name === "❌") return r_collector.stop();

            if(reaction.emoji.name === "✅") {
                handleTicket(bot, message, err, errMsg, command);
                embed.setColor(0x00ff00).addField("Ticket Sent!", "A member from our support team will message you shortly").setFooter(await utils.getDate());
                reaction.message.edit(embed);
                return r_collector.stop();
            }

            reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        });
        r_collector.on('end', e => msg.clearReactions());
    });
};