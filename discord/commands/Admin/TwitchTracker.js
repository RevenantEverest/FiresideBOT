const { Permissions } = require('discord.js');
const twitchServices = require('../../services/twitchServices');
const twitchTrackerController = require('../../controllers/dbControllers/twitchTrackerController');
const twitchTokenController = require('../../controllers/twitchTokensController');
const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let channel_id = null;
    let role_id = null;
    let flavor_text = null;
    let streamerSearch = null;
    if(!args[1]) return message.channel.send('Please Specify a Twitch User, tag a Text Channel and tag a role');

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

    streamerSearch = args[1];

    args.splice(0, 1);
    args.splice(0, 1);

    if(args[0]) flavor_text = args.join(" ");
    getTwitchInfo();

    async function getTwitchInfo() {
        twitchServices.getTwitchInfo(streamerSearch.toLowerCase())
        .then(streamer => getTrackers(streamer.data.data[0]))
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401) 
                    return twitchTokenController.updateToken(() => getTwitchInfo());
                else return message.channel.send('No Twitch User Found');
            }
            else errorHandler(bot, message, err, "Twitch API Error", "TwitchTracker");
        });
    }

    async function getTrackers(streamer) {
        if(!streamer) return message.channel.send("No Twitch User Found");
        twitchTrackerController.getByGuildId(bot, message, "TwitchTracker", message.guild.id, (trackers) => {
            if(trackers.filter(el => el.twitch_id === streamer.id).length > 0) 
                return message.channel.send(`Tracker already exists for **${streamer.login}**`);
            saveTracker(streamer);
        }, () => saveTracker(streamer));
    };

    async function saveTracker(streamer) {
        let data = { 
            guild_id: message.guild.id, 
            twitch_username: streamer.login, 
            twitch_id: streamer.id, 
            channel_id: channel_id, 
            role_id: role_id,
            flavor_text: flavor_text
        }
        twitchTrackerController.save(bot, message, "TwitchTracker", data, (tracker) => {
            return message.channel.send(`Tracker added for **${streamer.display_name}** and will be posted in <#${channel_id}>. ID: **${tracker.id}**`);
        });
    };
};

module.exports.config = {
    name: "twitchtracker",
    d_name: "TwitchTracker",
    aliases: ["tt", "ttracker"],
    params: {required: true, params: 'Twitch Username / #Channel Tag / @Role Tag'},
    category: "Admin",
    desc: "Creates a tracker for a Twitch User that posts when they're live to a text channel",
    example: "twitchtracker RevenantEverest #bot-commands Hello ${role}! ${streamer} is now live!"
};