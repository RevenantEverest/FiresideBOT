const rankSettingsDB = require('../../models/discordRankSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function saveRankSettings(guild, message) {
    rankSettingsDB.save({ guild_id: guild.id, general_increase_rate: 10, complexity: 10, channel_id: "none" })
    .then(() => message.channel.send("DB Updated"))
    .catch(err => console.error(err));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    rankSettingsDB.findByGuildId(message.guild.id)
    .then(() => message.channel.send("DB Already Updated"))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            saveRankSettings(message.guild, message);
        else console.log(err);
    })
};

module.exports.config = {
    name: "dbupdate",
    d_name: "DBUpdate",
    aliases: ['dbu'],
    category: "Dev"
};