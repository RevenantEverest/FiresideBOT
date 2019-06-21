const db = require('../../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    const trackerPromises = [
        db.findByGuildId(message.guild.id),
        db.findById(trackerID)
    ];
    Promise.all(trackerPromises).then()
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No Tracker Found");
        else {
            message.channel.send("No Tracker Found");
            console.error(err);
        }
    })
};

module.exports.config = {
    name: 'addrank',
    d_name: 'AddRank',
    aliases: ['ar'],
    params: { required: true, params: 'Rank Name' },
    category: 'Admin',
    desc: 'Creates a new Rank Tier',
    example: 'addrank NewRank'
};