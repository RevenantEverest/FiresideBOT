const twitchTrackerDB = require('../../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function deleteTracker(message, tracker) {
    twitchTrackerDB.delete(tracker.id)
    .then(() => message.channel.send(`Deleted Tracker for **${tracker.twitch_username}**`))
    .catch(err => {
        message.channel.send("Error Deleting Tracker")
        console.error(err);
    })
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify a flag and a Tracker ID");
    if(!args.includes("-t")) return message.channel.send("Please use a flag to define which tracker you'd like to remove");
    
    args.splice(args.indexOf("-t"), 1);
    if(!Number.isInteger(parseInt(args[1]), 10)) return message.channel.send("Invalid ID");

    twitchTrackerDB.findByGuildId(message.guild.id)
    .then(guildTrackers => {
        let tracker = guildTrackers.filter(el => el.id === parseInt(args[1], 10));
        
        if(tracker.length < 1) return message.channel.send("Invalid ID");
        else deleteTracker(message, tracker[0]);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            return message.channel.send("No Available Trackers")
        else console.error(err);
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