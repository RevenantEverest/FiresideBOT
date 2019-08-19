const twitchTrackerDB = require('../../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function deleteTracker(message, tracker) {
    if(tracker.guild_id !== message.guild.id) return message.channel.send("Invalid ID");
    twitchTrackerDB.delete(tracker.id)
    .then(() => message.channel.send(`Deleted Tracker for **${tracker.twitch_username}**`))
    .catch(err => errorHandler(bot, message, err, "Error Deleteing Tracker", "RemoveTracker"));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a flag and a Tracker ID");
    if(!args.includes("-t")) return message.channel.send("Please use a flag to define which tracker you'd like to remove");
    
    args.splice(args.indexOf("-t"), 1);

    twitchTrackerDB.findById(args[1])
    .then(tracker => deleteTracker(message, tracker))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send(`No Tracker Found`);
        else errorHandler(bot, message, err, "Error Finding Tracker By ID", "RemoveTracker");
    });
};

module.exports.config = {
    name: "removetracker",
    d_name: "RemoveTracker",
    aliases: ["rtracker", "rt"],
    params: { required: true, params: "Tracker ID" },
    flags: ['-t'],
    category: 'Admin',
    desc: 'Deletes a Tracker',
    example: "removetracker -t 53"
};