const Discord = require("discord.js");
const ticketsController = require('./ticketsController');
const loggerServices = require('../services/loggerServices');

async function getDate() {
    let date = new Date();
    let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return `${date.toLocaleString('en-US', options)} EST`;
}

async function logError(bot, message, err, errMsg, command) {
    console.error(err);
    let embed = new Discord.MessageEmbed();
    embed
    .setColor(0xff0000)
    .setTitle("**New Error**")
    .addField("Guild ID:", message.guild.id, true)
    .addField("Guild Name:", message.guild.name, true)
    .addField("Command:", command)
    .addField("Error Message:", errMsg)
    .setFooter(await getDate());

    bot.channels.resolve(process.env.ENVIRONMENT === "DEV" ? "624216968844804096" : "624755756079513621").send(embed);

    if(process.env.ENVIRONMENT === "DEV") return;

    err = err.toString().split("").map((el, idx) => idx <= 1024 ? el : null).filter(Boolean).join("");
    let data = { command: command, args: message.content, guild_id: message.guild.id, discord_id: message.author.id, error_message: errMsg, error: err};

    loggerServices.commandErrorLogger(data)
    .catch(err => console.error(err));
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
    let embed = new Discord.MessageEmbed();
    
    embed
    .setColor(0xff0000)
    .addField(errMsg, "An error has occurred. Sorry for the inconvience.\n\nWould you like to open a support ticket?")
    
    message.channel.send(embed).then(async msg => {
        await msg.react("✅");
        await msg.react("❌");
        
        logError(bot, message, err, errMsg, command);

        const r_collector = new Discord.ReactionCollector(msg, r => r.users.cache.array()[r.users.cache.array().length - 1].id === message.author.id, { time: 60000 });

        r_collector.on('collect', async (reaction, user) => {
            embed = new Discord.MessageEmbed();
            if(reaction.users.cache.array()[reaction.users.cache.array().length - 1].id === bot.user.id) return;
            if(reaction.emoji.name === "❌") return r_collector.stop();

            if(reaction.emoji.name === "✅") {
                handleTicket(bot, message, err, errMsg, command);
                embed.setColor(0x00ff00).addField("Ticket Sent!", "A member from our support team will message you shortly").setFooter(await getDate());
                reaction.message.edit(embed);
                return r_collector.stop();
            }

            reaction.remove(reaction.users.cache.array()[reaction.users.cache.array().length - 1].id);
        });
        r_collector.on('end', e => {
            let permissions = new Discord.Permissions(message.channel.permissionsFor(bot.user).bitfield);
            if(permissions && !permissions.has("MANAGE_MESSAGES")) return;
            msg.reactions.removeAll();
        });
    });
};