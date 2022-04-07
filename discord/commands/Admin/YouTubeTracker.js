const { Permissions } = require('discord.js');
const youtubeServices = require('../../services/youtubeServices');
const youtubeTrackersController = require('../../controllers/dbControllers/youtubeTrackersController');
const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('Please provide a YouTube channel link, tag a text channel and optionally tag a role');

    let channel_id = null;
    let channel_name = null;
    let role_id = null;
    let flavor_text = null;
    let channelSearch = null;

    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");

    if(args.includes("@everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else role_id = "none";

    args.splice(args.indexOf("<#" + channel_id + ">"), 1);
    if(role_id !== "none") args.splice(args.indexOf(role_id === "@everyone" ? "@everyone" : `<@&${role_id}>`), 1);

    let permissions = new Permissions(bot.channels.resolve(channel_id).permissionsFor(bot.user).bitfield);
    if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS"))
        return message.channel.send("Fireside doesn't have permissions to post or embed links in that channel");

    if(/https?\:\/\/(w{3})?\.?(youtube\.com|youtu\.be)\/(user|channel|c)\//gi.exec(args.join(" "))) {
        for(let i = 0; i < args.length; i++) {
            let linkChecker = /https?\:\/\/(w{3})?\.?(youtube\.com|youtu\.be)\/(user|channel|c)\//gi;
            if(linkChecker.exec(args[i])) {
                channelSearch = args[i];
                args.splice(i, 1);
            }
        }
    }
    else return message.channel.send("Please provide a valid YouTube channel URL");

    args.splice(0, 1);

    if(args[0]) flavor_text = args.join(" ");
    getYouTubeChannelPage();

    async function getYouTubeChannelPage() {
        youtubeServices.getChannelPage(channelSearch)
        .then(content => {
            content = content.data.toString();
            let channelIdRegex = /(?<=itemprop="channelId" content=")(.*?)(?=")/i;
            let channelNameRegex = /(?<="canonicalBaseUrl":"\/c\/)(.*?)(?=")/i;
            let channelNameRegex2 = /(?<="shortBylineText":{"runs":\[{"text":")(.*?)(?=")/i;

            let channelIdResult = content.match(channelIdRegex);
            let channelNameResult = content.match(channelNameRegex);
            let channelNameResult2 = content.match(channelNameRegex2);

            let channelId = channelIdResult[0];
            let channelName = channelNameResult ? channelIdResult[0] : channelNameResult2[0];
            getTrackers(channelId, channelName);
        })
        .catch(err => errorHandler(bot, message, err, "YouTube Channel Page Error", "YouTubeTracker"));
    };

    async function getTrackers(youtubeChannelId, youtubeChannelName) {
        youtubeTrackersController.getByGuildId(bot, message, "YouTubeTracker", message.guild.id, (trackers) => {
            if(trackers.filter(el => el.youtube_channel_id === youtubeChannelId).length > 0)
                return message.channel.send(`YouTube Tracker already exists for **${youtubeChannelName}`);
            saveTracker(youtubeChannelId, youtubeChannelName);
        }, () => saveTracker(youtubeChannelId, youtubeChannelName));
    };

    async function saveTracker(youtubeChannelId, youtubeChannelName) {
        let data = {
            guild_id: message.guild.id,
            youtube_channel_id: youtubeChannelId,
            youtube_channel_name: youtubeChannelName,
            channel_id: channel_id,
            role_id: role_id,
            flavor_text: flavor_text
        };
        youtubeTrackersController.save(bot, message, "YouTubeTracker", data, (tracker) => {
            return message.channel.send(`YouTube Tracker added for **${youtubeChannelName}** and will be posted in <#${channel_id}>. ID: **${tracker.id}**`);
        });
    };
};

module.exports.config = {
    name: "youtubetracker",
    d_name: "YouTubeTracker",
    aliases: ["ytt", "yttracker"],
    params: {required: true, params: 'YouTube Channel Link / #Channel Tag / Optional @Role Tag'},
    category: "Admin",
    desc: "Creates a tracker for a YouTube channel that posts when they're streaming to a text channel",
    example: "youtubetracker https://www.youtube.com/user/PewDiePie #general Hello ${role}! ${streamer} is now live!"
};