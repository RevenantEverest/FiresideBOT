const twitchTrackerController = require('../../controllers/dbControllers/twitchTrackerController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a flag and a Tracker ID");
    if(!args.includes("-t")) return message.channel.send("Please use a flag to define which tracker you'd like to remove");
    
    args.splice(args.indexOf("-t"), 1);

    twitchTrackerController.getOne(bot, message, "RemoveTracker", args[1], deleteTracker, () => {
        return message.channel.send("Tracker Not Found");
    });

    async function deleteTracker(tracker) {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("Tracker Not Found");
        twitchTrackerController.delete(bot, message, "RemoveTracker", tracker.id, () => {
            return message.channel.send(`Deleted Tracker for **${tracker.twitch_username}**`);
        });
    };
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