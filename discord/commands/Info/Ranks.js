const Discord = require('discord.js');
const db = require('../../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let embed = new Discord.MessageEmbed();
    embed
    .setColor(0xffd633)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setAuthor(`Available Ranks for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
    db.findByGuildId(message.guild.id)
    .then(ranks => {
        let ranksField = '';
        embed.setDescription(`**Total Ranks:** ${ranks.length}`);
        ranks.forEach(el => ranksField += `${el.rank_number}. **${el.rank_name}** *ID*: ${el.id}\n`);
        embed.addField(`Ranks:`, ranksField)
        message.channel.send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) message.channel.send("No Ranks Found");
        else errorHandler(bot, message, err, "Error Finding Ranks", "Ranks");
    })
    
};

module.exports.config = {
    name: 'ranks',
    d_name: 'Ranks',
    aliases: ['r'],
    category: 'Info',
    desc: 'Displays all available Rank Tiers',
    example: 'ranks'
};