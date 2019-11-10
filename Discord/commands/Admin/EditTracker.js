const { Permissions } = require('discord.js');
const twitchTrackerController = require('../../controllers/dbControllers/twitchTrackerController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify an available flag, tracker ID, #Channel-Tag or @Role Tag");

    let channel_id = null;
    let role_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else if(args.includes("@everyone") || args.includes("everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in or tag a Role you'd like to be notified when the tracker is posted");

    if(channel_id) {
        let permissions = new Permissions(bot.channels.get(channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS"))
            return message.channel.send("Fireside doesn't have permissions to post or embed links in that channel");
        args.splice(args.indexOf(`<#${channel_id}>`), 1);
    }
    else if(role_id) args.splice(args.indexOf(`<@&${role_id}>`), 1);

    if(!args.includes("-t")) return message.channel.send("Please specify a valid flag");
    args.splice(args.indexOf("-t"), 1);

    twitchTrackerController.getOne(bot, message, "EditTracker", args[1], updateTracker, () => {
        return message.channel.send("No Tracker Found");
    });

    async function updateTracker(tracker) {
        if(tracker.guild_id !== message.guild.id) return message.channel.send("No Tracker Found");
        let data = { 
            id: tracker.id, 
            guild_id: tracker.guild_id, 
            twitch_username: tracker.twitch_username, 
            twitch_id: tracker.twitch_id,
            channel_id: (channel_id ? channel_id : tracker.channel_id), 
            role_id: (role_id ? role_id : tracker.role_id) 
         };
        twitchTrackerController.update(bot, message, "EditTracker", data, (newTracker) => {
            message.channel.send(
                `Tracker for **${tracker.twitch_username}** updated and now will post in <#${newTracker.channel_id}> ` + 
                `${newTracker.role_id !== "none" ? `and will tag <@&${newTracker.role_id}>` : ''}`
            );
        });
    };
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