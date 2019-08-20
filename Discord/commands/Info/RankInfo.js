const Discord = require('discord.js');
const ranksDB = require('../../models/discordRanksDB');
const recordsDB = require('../../models/discordRankRecordsDB');
const settingsDB = require('../../models/discordRankSettingsDB');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getRank(bot, settings, args, message) {
    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => {
        let rank = ranks.filter(el => el.rank_name === args.join(" "));
        if(rank.length < 1) return message.channel.send("No Rank Found");
        else handleRankInfo(bot, settings, rank[0], message);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No Ranks Found");
        else errorHandler(bot, message, err, "DB Error", "RankInfo");
    })
}

async function handleRankInfo(bot, settings, rank, message) {
    recordsDB.findByGuildId(message.guild.id)
    .then(async records => {
        let rankMembers = [];
        await records.forEach(async (el, idx) => {
            let Level = await utils.calculateLevel(settings.complexity, parseInt(el.xp, 10));

            if(rank.rank_number <= Level) rankMembers.push(el);
            else if(Level === parseInt(rank.rank_number, 10)) rankMembers.push(el);

            if(idx === (records.length - 1)) return sendEmbed(settings, rank, rankMembers, message);
        })
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No Records Found");
        else errorHandler(bot, message, err, "DB Error", "RankInfo");
    })
};

async function sendEmbed(settings, rank, rankMembers, message) {
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xff66b3)
    .addField(`**${rank.rank_name}**`,
        `**Rank ID**: ${rank.id}\n` +
        `**Tier**: ${rank.rank_number}\n` +
        `**Members At Rank**: ${rankMembers.length}`
    )

    message.channel.send(embed);
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a rank name");

    args.splice(0, 1);

    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRank(bot, settings, args, message))
    .catch(err => errorHandler(bot, message, err, "Error Finding Rank Settings", "RankInfo"));
};

module.exports.config = {
    name: 'rankinfo',
    d_name: 'RankInfo',
    aliases: ['ri'],
    category: 'Info',
    desc: 'Displays available Rank Tier Info',
    example: 'rankinfo MyRank'
};