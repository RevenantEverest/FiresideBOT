const db = require('../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function update(message, channel_id) {
    db.update({ guild_id: message.guild.id, enabled: true, channel_id: channel_id })
    .then(() => message.channel.send(`Server Logging is now **enabled** and logs will be posted in <#${channel_id}>`))
    .catch(err => console.error(err));
};

async function save(message, channel_id) {
    db.save({ guild_id: message.guild.id, enabled: true, channel_id: channel_id })
    .then(() => message.channel.send(`Server Logging is now **enabled** and logs will be posted in <#${channel_id}>`))
    .catch(err => console.error(err));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Logs posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the Logs to be posted in");

    db.findByGuildId(message.guild.id)
    .then(settings => {
        if(settings.enabled) return message.channel.send("Server Logging already enabled");
        else update(message, channel_id);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            save(message, channel_id);
        else console.error(err);
    })
};

module.exports.config = {
    name: 'enableserverlogging',
    d_name: 'EnableServerLogging',
    aliases: ['esl'],
    params: { required: true, params: '#Channel Tag' },
    category: 'Config',
    desc: 'Enable Server Logging',
    example: 'enableserverlogging #bot-commands'
};