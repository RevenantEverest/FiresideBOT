const Discord = require('discord.js');
const ranksDB = require('../../models/discordRanksDB');
const settingsDB = require('../../models/discordRankSettingsDB');
const recordsDB = require('../../models/discordRankRecordsDB');
const { rankUtils } = require("../../utils");

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getRanks(bot, message, settings) {
    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => getRecords(bot, message, settings, ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) 
            message.channel.send("No Ranks Found");
        else errorHandler(bot, message, err, "DB Error", "Leaderboards");
    });
};

async function getRecords(bot, message, settings, ranks) {
    recordsDB.findByGuildId(message.guild.id)
    .then(records => {
        let top10 = [];
        records.forEach((el, idx) => {
            if(idx <= 10) top10.push(el);
            else return;
        });
        sendEmbed(bot, message, settings, ranks, top10);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) 
            message.channel.send("No Record Found");
        else errorHandler(bot, message, err, "DB Error", "Leaderboards");
    })
}

async function sendEmbed(bot, message, settings, ranks, records) {
    
    let embed = new Discord.MessageEmbed();
    let topUser = await bot.users.resolve(records[0].discord_id);
    let topTen = '';

    embed
    .setColor(0xff66b3)
    .setThumbnail(topUser.avatarURL({ dynamic: true }))
    .setAuthor(`Leaderboards for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))

    await records.forEach(async (el, idx) => {
        let user = await bot.users.resolve(el.discord_id) || { username: "[Deleted User]" };
        let Level = await rankUtils.calculateLevel(settings.complexity, (parseInt(el.xp, 10) + parseInt(settings.general_increase_rate, 10)));
        let RankName = ranks.length <= Level ?  ranks[ranks.length - 1].rank_name : ranks.filter(el => el.rank_number === Level)[0].rank_name;
        
        if(idx === 0)
            embed
            .setTitle(`**Top Member**`)
            .setDescription(`**Username:** ${user.username}\n**Rank ${Level}**: ${RankName}\n**EXP:** ${parseInt(el.xp, 10).toLocaleString()}`)
            .addField("\u200B", "\u200B")
        else topTen += `**${idx + 1}. ${user.username}** ( EXP: ${parseInt(el.xp, 10).toLocaleString()} )\n`;
        
        if(idx === (records.length - 1)) {
            embed.addField("Top 10:", topTen);
            return message.channel.send(embed);
        }
    });
}

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRanks(bot, message, settings))
    .catch(err => errorHandler(bot, message, err, "Error Finding Rank Settings", "Leaderboards"));
};

module.exports.config = {
    name: 'leaderboard',
    d_name: 'Leaderboard',
    aliases: ['lb'],
    category: 'Info',
    desc: 'Displays Rank Leaderboard for server',
    example: 'leaderboard'
};