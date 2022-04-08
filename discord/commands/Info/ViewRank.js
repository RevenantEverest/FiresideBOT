const Discord = require('discord.js');
const ranksDB = require('../../models/discordRanksDB');
const settingsDB = require('../../models/discordRankSettingsDB');
const recordsDB = require('../../models/discordRankRecordsDB');
const { rankUtils } = require("../../utils");

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getRanks(bot, message, user_id, settings) {
    ranksDB.findByGuildId(message.guild.id)
    .then(ranks => getRecord(bot, message, user_id, settings, ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) 
            message.channel.send("No Ranks Found");
        else errorHandler(message, err, "DB Error", "ViewRank");
    });
}

async function getRecord(bot, message, user_id, settings, ranks) {
    recordsDB.findByDiscordIdAndGuildId({ discord_id: user_id, guild_id: message.guild.id })
    .then(record => sendEmbed(bot, message, settings, ranks, record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) 
            message.channel.send("No Record Found");
        else errorHandler(bot, message, err, "DB Error", "ViewRank");
    })
}

async function sendEmbed(bot, message, settings, ranks, record) {
    let Level = await rankUtils.calculateLevel(settings.complexity, (parseInt(record.xp, 10) + parseInt(settings.general_increase_rate, 10)));
    let RankName = ranks.length <= Level ?  ranks[ranks.length - 1].rank_name : ranks.filter(el => el.rank_number === Level)[0].rank_name;

    let embed = new Discord.MessageEmbed();
    let user = await bot.users.resolve(record.discord_id);

    embed
    .setColor(0xff66b3)
    .setAuthor(`${user.username}'s Rank`, user.avatarURL({ dynamic: true }))
    .setThumbnail(user.avatarURL({ dynamic: true }))
    .setDescription( 
        `**Rank**: ${RankName}\n` + 
        `**Tier**: ${Level > ranks.length ? ranks.length : Level.toLocaleString()}\n` + 
        `**EXP**: ${parseInt(record.xp, 10).toLocaleString()}`
    )

    message.channel.send(embed);
}

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a user");
    if(!message.content.split(" ")[1].startsWith('<@')) return message.channel.send('Please specify a valid recipient');
    let user_id = /<@!?(\d+)>/.exec(args.join(" "))[1];

    settingsDB.findByGuildId(message.guild.id)
    .then(settings => getRanks(bot, message, user_id, settings))
    .catch(err => errorHandler(bot, message, err, "Error Finding Rank Settings", "ViewRank"));
};

module.exports.config = {
    name: 'viewrank',
    d_name: 'ViewRank',
    aliases: ['vr'],
    params: { required: true, params: '@Tag' },
    category: 'Info',
    desc: 'View a users Rank',
    example: 'viewrank @RevenantEverest'
};