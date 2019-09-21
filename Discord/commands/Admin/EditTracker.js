const twitchTrackerDB = require('../../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getTwitchTrackers(bot, message, args, channel_id, role_id) {
    args.splice(args.indexOf("-t"), 1);
    twitchTrackerDB.findById(args[1])
    .then(tracker => {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("Invalid ID");
        else updateTracker(bot, message, args, channel_id, role_id, tracker);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send(`No Tracker Found`);
        else errorHandler(bot, message, err, "DB Error", "EditTracker");
    })
}

async function updateTracker(bot, message, args, channel_id, role_id, tracker) {
    twitchTrackerDB.update({ 
        id: tracker.id, 
        guild_id: tracker.guild_id, 
        twitch_username: tracker.twitch_username, 
        twitch_id: tracker.twitch_id,
        channel_id: (channel_id ? channel_id : tracker.channel_id), 
        role_id: (role_id ? role_id : tracker.role_id) 
    })
    .then(uTracker => {
        message.channel.send(
            `Tracker for **${tracker.twitch_username}** updated and now will post in <#${uTracker.channel_id}> ` + 
            `${uTracker.role_id !== "none" ? `and will tag <@&${uTracker.role_id}>` : ''}`
        );
    })
    .catch(err => errorHandler(bot, message, err, "Error Updating Tracker", "EditTracker"));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify an available flag, tracker ID, #Channel-Tag or @Role Tag");

    let channel_id = null;
    let role_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else if(args.includes("@everyone") || args.includes("everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in or tag a Role you'd like to be notified when the tracker is posted");

    if(channel_id) args.splice(args.indexOf(`<#${channel_id}>`), 1);
    else if(role_id) args.splice(args.indexOf(`<@&${role_id}>`), 1);

    if(args.includes("-t")) getTwitchTrackers(bot, message, args, channel_id, role_id);
    else return message.channel.send("Please specify a valid flag");
};

module.exports.config = {
    name: 'edittracker',
    d_name: 'EditTracker',
    aliases: ['et'],
    params: { required: true, params: 'Flag / Tracker ID / #Channel-Tag and/or @Role Tag' },
    flags: ['-t'],
    category: 'Admin',
    desc: 'Edit an existing tracker',
    example: 'edittracker -t 108 #general @everyone'
};