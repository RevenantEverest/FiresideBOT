const Discord = require('discord.js');
const ranksDB = require('../../models/discordRanksDB');
const recordsDB = require('../../models/discordRankRecordsDB');
const settingsDB = require('../../models/discordRankSettingsDB');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getRanks(message, settings) {
    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => getRecord(message, settings, ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) message.channel.send("No Ranks Found");
        else console.error(err);
    });
}

async function getRecord(message, settings, ranks) {
    recordsDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
    .then(record => sendEmbed(message, settings, ranks, record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) message.channel.send("No Record Found");
        else console.error(err);
    })
}

async function sendEmbed(message, settings, ranks, record) {
    let Level = await utils.calculateLevel(settings.complexity, (parseInt(record.xp, 10) + parseInt(settings.general_increase_rate, 10)));
    let RankName = ranks.length <= Level ?  ranks[ranks.length - 1].rank_name : ranks.filter(el => el.rank_number === Level)[0].rank_name;

    let embed = new Discord.RichEmbed();

    embed
    .setColor(0xff66b3)
    .setThumbnail(message.author.avatarURL)
    .addField("My Rank", 
        `**Rank**: ${RankName}\n` + 
        `**Tier**: ${Level > ranks.length ? ranks.length : Level.toLocaleString()}\n` + 
        `**EXP**: ${record.xp.toLocaleString()}`
    )

    message.channel.send(embed);
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRanks(message, settings))
    .catch(err => console.error(err));
};

module.exports.config = {
    name: 'myrank',
    d_name: 'MyRank',
    aliases: ['mr'],
    category: 'Info',
    desc: 'Displays current Rank and XP',
    example: 'myrank'
};