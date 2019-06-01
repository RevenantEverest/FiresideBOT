const Discord = require('discord.js');
const ranksDB = require('../../models/discordRanksDB');
const settingsDB = require('../../models/discordRankSettingsDB');
const recordsDB = require('../../models/discordRankRecordsDB');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getRanks(bot, message, settings) {
    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => getRecords(bot, message, settings, ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) message.channel.send("No Ranks Found");
        else console.error(err);
    });
}

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
        if(err instanceof QRE && err.code === qrec.noData) message.channel.send("No Record Found");
        else console.error(err);
    })
}

async function sendEmbed(bot, message, settings, ranks, records) {
    
    let embed = new Discord.RichEmbed();
    let topUser = await bot.fetchUser(records[0].discord_id);

    embed
    .setColor(0xff66b3)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${topUser.id}/${topUser.avatar}.png`)
    .addField('Leaderboard', message.guild.name)
    .addBlankField()

    await records.forEach(async (el, idx) => {
        let user = await bot.fetchUser(el.discord_id);
        let Level = await utils.calculateLevel(settings.complexity, (parseInt(el.xp, 10) + parseInt(settings.general_increase_rate, 10)));
        let RankName = ranks.length <= Level ?  ranks[ranks.length - 1].rank_name : ranks.filter(el => el.rank_number === Level)[0].rank_name;
        
        embed.addField(`${idx + 1}. ${user.username}`, 
            `**Tier**: ${Level}\n` +
            `**Rank**: ${RankName}\n` +
            `**EXP**: ${parseInt(el.xp, 10).toLocaleString()}` 
        );
        if(idx === (records.length - 1)) return message.channel.send(embed);
    });
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRanks(bot, message, settings))
    .catch(err => console.error(err));
};

module.exports.config = {
    name: 'leaderboard',
    d_name: 'Leaderboard',
    aliases: ['lb'],
    category: 'Info',
    desc: 'Displays Rank Leaderboard for server',
    example: 'leaderboard'
};