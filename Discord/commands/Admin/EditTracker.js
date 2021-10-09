const { Permissions } = require('discord.js');
const twitchTrackerController = require('../../controllers/dbControllers/twitchTrackerController');
const youtubeTrackerController = require('../../controllers/dbControllers/youtubeTrackersController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify an available flag, tracker ID, #Channel-Tag or @Role Tag");

    let channel_id = null;
    let role_id = null;
    let tracker_id = null;
    let flavor_text = null;

    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    
    if(args.includes("@everyone") || args.includes("everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];

    if(channel_id) {
        let permissions = new Permissions(bot.channels.resolve(channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS"))
            return message.channel.send("Fireside doesn't have permissions to post or embed links in that channel");
        args.splice(args.indexOf(`<#${channel_id}>`), 1);
    }
    
    if(role_id) args.splice(args.indexOf(`<@&${role_id}>`), 1);

    let isTwitch = false;
    let isYouTube = false;
    if(!args.includes("-t") && !args.includes("-yt")) return message.channel.send("Please specify a valid flag");
    else if (args.includes("-t")) {
        args.splice(args.indexOf("-t"), 1);
        isTwitch = true;
    }
    else if (args.includes("-yt")) {
        args.splice(args.indexOf("-yt"), 1);
        isYouTube = true;
    }
    else if(!args.includes("-t") || !args.includes("-yt")) return message.channel.send("Please specify a valid flag");

    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid ID provided");
    else tracker_id = parseInt(args[1], 10);

    args.splice(0, 1);
    args.splice(0, 1);

    if(args[0]) flavor_text = args.join(" ");

    if(!channel_id && !role_id && !flavor_text) 
        return message.channel.send("Please tag a Text Channel you'd like the tracker to post in or tag a Role you'd like to be notified when the tracker is posted");

    if(isTwitch) 
        twitchTrackerController.getOne(bot, message, "EditTracker", tracker_id, updateTwitchTracker, () => {
            return message.channel.send("No Tracker Found");
        });
    else if(isYouTube)
        youtubeTrackerController.getOne(bot, message, "EditTracker", tracker_id, updateYouTubeTracker, () => {
            return message.channel.send("No Tracker Found");
        });

    async function updateTwitchTracker(tracker) {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("No Tracker Found");
        let data = { 
            id: tracker.id, 
            guild_id: tracker.guild_id, 
            twitch_username: tracker.twitch_username, 
            twitch_id: tracker.twitch_id,
            channel_id: (channel_id ? channel_id : tracker.channel_id), 
            role_id: (role_id ? role_id : tracker.role_id),
            flavor_text: (flavor_text ? flavor_text : tracker.flavor_text)
         };
        twitchTrackerController.update(bot, message, "EditTracker", data, (newTracker) => {
            let messageText = `Tracker for **${tracker.twitch_username}** updated `;
            if(channel_id) messageText += `and will now be posted in <#${newTracker.channel_id}> `;
            if(role_id) messageText += `and will tag <@&${newTracker.role_id}> `;
            return message.channel.send(messageText);
        });
    };

    async function updateYouTubeTracker(tracker) {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("No Tracker Found");
        let data = {
            id: tracker.id,
            guild_id: tracker.guild_id,
            youtube_channel_id: tracker.youtube_channel_id,
            youtube_channel_name: tracker.youtube_channel_name,
            channel_id: channel_id ? channel_id : tracker.channel_id,
            role_id: role_id ? role_id : tracker.role_id,
            flavor_text: flavor_text ? flavor_text : tracker.flavor_text
        };
        youtubeTrackerController.update(bot, message, "EditTracker", data, (newTracker) => {
            let messageText = `Tracker for **${tracker.youtube_channel_name}** updated `;
            if(channel_id) messageText += `and will now be posted in <#${newTracker.channel_id}> `;
            if(role_id) messageText += `and will tag <@&${newTracker.role_id}> `;
            return message.channel.send(messageText);
        });
    };
};

module.exports.config = {
    name: 'edittracker',
    d_name: 'EditTracker',
    aliases: ['et'],
    params: { required: true, params: 'Flag / Tracker ID / #Channel-Tag and/or @Role Tag' },
    flags: ['-t', '-yt'],
    category: 'Admin',
    desc: 'Edit an existing tracker',
    example: 'edittracker -t 108 #general @everyone'
};