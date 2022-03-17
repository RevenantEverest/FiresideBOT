const Discord = require('discord.js');
const ranksDB = require('../../models/discordRanksDB');
const recordsDB = require('../../models/discordRankRecordsDB');
const settingsDB = require('../../models/discordRankSettingsDB');
const { rankUtils } = require("../../utils");

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getRanks(bot, message, settings) {
    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => getRecord(bot, message, settings, ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) 
            message.channel.send("No Ranks Found");
        else errorHandler(bot, message, err, "DB Error", "MyRank");
    });
}

async function getRecord(bot, message, settings, ranks) {
    recordsDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
    .then(record => sendEmbed(message, settings, ranks, record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) 
            message.channel.send("No Record Found");
        else errorHandler(bot, message, err, "DB Error", "MyRank");
    });
}

async function sendEmbed(message, settings, ranks, record) {
    let Level = await rankUtils.calculateLevel(settings.complexity, (parseInt(record.xp, 10) + parseInt(settings.general_increase_rate, 10)));
    let RankName = ranks.length <= Level ?  ranks[ranks.length - 1].rank_name : ranks.filter(el => el.rank_number === Level)[0].rank_name;

    let embed = new Discord.MessageEmbed();
    embed
    .setColor(0xff66b3)
    .setThumbnail(message.author.avatarURL({ dynamic: true }))
    .setAuthor(`${message.author.username}'s Rank`, message.author.avatarURL({ dynamic: true }))
    .setDescription( 
        `**Rank:** ${RankName}\n` + 
        `**Tier:** ${Level > ranks.length ? ranks.length : Level.toLocaleString()}\n` +
        `**EXP:** ${parseInt(record.xp, 10).toLocaleString()}`
    )

    message.channel.send(embed);
}

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRanks(bot, message, settings))
    .catch(err => errorHandler(bot, message, err, "Error Finding Rank Settings", "MyRank"));
};

module.exports.config = {
    name: 'myrank',
    d_name: 'MyRank',
    aliases: ['mr'],
    category: 'Info',
    desc: 'Displays current Rank and XP',
    example: 'myrank'
};