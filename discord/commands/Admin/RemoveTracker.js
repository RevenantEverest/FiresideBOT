const twitchTrackerController = require('../../controllers/dbControllers/twitchTrackerController');
const youtubeTrackerController = require('../../controllers/dbControllers/youtubeTrackersController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a flag and a Tracker ID");

    if(args.includes("-t") && args.includes("-yt")) return message.channel.send("Please define either **-t** or **-yt** not both");
    else if(args.includes("-t")) return getTwitchTracker();
    else if(args.includes("-yt")) return getYouTubeTracker();
    else return message.channel.send("Please use a flag to define which tracker you'd like to remove");

    /* Twitch Tracker */
    async function getTwitchTracker() {
        args.splice(args.indexOf("-t"), 1);
        twitchTrackerController.getOne(bot, message, "RemoveTracker", args[1], deleteTwitchTracker, () => {
            return message.channel.send("Tracker Not Found");
        });
    };

    async function deleteTwitchTracker(tracker) {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("Tracker Not Found");
        twitchTrackerController.delete(bot, message, "RemoveTracker", tracker.id, () => {
            return message.channel.send(`Deleted Tracker for **${tracker.twitch_username}**`);
        });
    };

    /* YouTube Tracker */
    async function getYouTubeTracker() {
        args.splice(args.indexOf("-yt"), 1);
        youtubeTrackerController.getOne(bot, message, "RemoveTracker", args[1], deleteYouTubeTracker, () => {
            return message.channel.send("Tracker Not Found");
        });
    };

    async function deleteYouTubeTracker(tracker) {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("Tracker Not Found");
        youtubeTrackerController.delete(bot, message, "RemoveTracker", tracker.id, () => {
            return message.channel.send(`Deleted Tracker for **${tracker.youtube_channel_name}**`);
        });
    };
};

module.exports.config = {
    name: "removetracker",
    d_name: "RemoveTracker",
    aliases: ["rtracker", "rt"],
    params: { required: true, params: "Tracker ID" },
    flags: ['-t', '-yt'],
    category: 'Admin',
    desc: 'Deletes a Tracker',
    example: "removetracker -t 53"
};