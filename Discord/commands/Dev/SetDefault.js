const guildsDB = require('../../models/GuildModels/guildsDB');
const currencyDB = require('../../models/currencyDB');
const rankSettingsDB = require('../../models/discordRankSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function findGuildSettingsDB(bot, message, guild_id) {
    guildsDB.findSettings(guild_id)
    .then(() => findCurrencySettings(bot, message, guild_id, `Guild Settings Found\n`))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            setDefaultGuildSettings(bot, message, guild_id);
        else errorHandler(bot, message, err, "Error Finding Guild Settings", "Config");
    });
};

async function findCurrencySettings(bot, message, guild_id, updateMessage) {
    currencyDB.findCurrencySettings(guild_id)
    .then(() => findRankSettings(bot, message, guild_id, `${updateMessage}Currency Settings Found\n`))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            setDefaultCurrencySettings(bot, message, guild_id, updateMessage);
        else errorHandler(bot, message, err, "Error Finding Currency Settings", "Config");
    });
};

async function findRankSettings(bot, message, guild_id, updateMessage) {
    rankSettingsDB.findByGuildId(guild_id)
    .then(() => message.channel.send(updateMessage + 'Rank Settings Found'))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            setDefaultRankSettings(bot, message, guild_id, updateMessage);
        else errorHandler(bot, message, err, "Error Finding Rank Settings", "Config");
    });
};

async function setDefaultGuildSettings(bot, message, guild_id) {
    guildsDB.saveDefaultSettings({ guild_id: guild_id, prefix: '?', volume: 50 })
    .then(() => findCurrencySettings(bot, message, guild_id, `Guild Settings SAVED\n`))
    .catch(err => errorHandler(bot, message, err, "Error Finding Guild Settings", "Config"))
};

async function setDefaultCurrencySettings(bot, message, guild_id, updateMessage) {
    currencyDB.saveDefaultSettings({ guild_id: guild_id, currency_name: 'Kindling', currency_increase_rate: 10 })
    .then(() => findRankSettings(bot, message, guild_id, `${updateMessage}Currency Settings SAVED\n`))
    .catch(err => errorHandler(bot, message, err, "Error Saving Currency Settings", "Config"));
};

async function setDefaultRankSettings(bot, message, guild_id, updateMessage) {
    rankSettingsDB.save({ guild_id: guild_id, general_increase_rate: 10, complexity: 2, channel_id: "none" })
    .then(() => message.channel.send(updateMessage + 'Rank Settings SAVED'))
    .catch(err => errorHandler(bot, message, err, "Error Saving Rank Settings", "Config"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    if(!args[1]) return message.channel.send("Please Specify a Guild ID");
    if(!bot.guilds.array().map(el => el.id).includes(args[1])) return message.channel.send("Invalid Guild ID");
    findGuildSettingsDB(bot, message, args[1]);
};

module.exports.config = {
    name: 'setdefault',
    d_name: 'SetDefault',
    aliases: [],
    category: 'Dev',
    desc: 'Sets Default Settings',
    example: 'setdefault 9918836291812'
};