const db = require('../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function update(message, channel_id) {
    db.update({ guild_id: message.guild.id, enabled: false, channel_id: channel_id })
    .then(() => message.channel.send(`Server Logging is now **disabled**`))
    .catch(err => errorHandler(message, err, "Error Updating Log Settings", "DisableServerLogging"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);

    db.findByGuildId(message.guild.id)
    .then(settings => {
        if(!settings.enabled) return message.channel.send("Server Logging already disabled");
        else update(message, settings.channel_id);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            return message.channel.send("Server Logging already disabled");
        else errorHandler(message, err, "Error Finding Log Settings", "DisableServerLogging");
    })
};

module.exports.config = {
    name: 'disableserverlogging',
    d_name: 'DisableServerLogging',
    aliases: ['dsl'],
    category: 'Config',
    desc: 'Disable Server Logging',
    example: 'disableserverlogging'
};