const twitchServices = require('../../services/twitchServices');
const twitchtrackerDB = require('../../models/twitchTrackerDB');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let channel_id = null;
    let role_id = null;
    if(!args[1]) return message.channel.send('Please Specify a Twitch User, tag a Text Channel and tag a role');

    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");

    if(args.includes("@everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else role_id = "none";

    args.splice(args.indexOf("<#" + channel_id + ">"), 1);
    
    if(role_id !== "none") 
        args.splice(args.indexOf((role_id === "@everyone" ? "@everyone" : `<#${role_id}>`), 1));

    twitchServices.getTwitchInfo(args[1])
    .then(streamer => {
        twitchtrackerDB.save({ guild_id: message.guild.id, twitch_username: streamer.data.name, channel_id: channel_id, role_id: role_id })
        .then(tracker => message.channel.send(`Tracker added for **${streamer.data.display_name}** and will be posted in <#${channel_id}>. ID: **${tracker.id}**`))
        .catch(err => errorHandler(message, err, "Error Saving Tracker", "TwitchTracker"));
    })
    .catch(err => {
        if(err.response.status === 404)
            message.channel.send('No Twitch User Found');
        else errorHandler(message, err, "Twitch API Error", "TwitchTracker");
    });
};

module.exports.config = {
    name: "twitchtracker",
    d_name: "TwitchTracker",
    aliases: ["tt", "ttracker"],
    params: {required: true, params: 'Twitch Username / #Channel Tag / @Role Tag'},
    category: "Admin",
    desc: "Creates a tracker for a Twitch User that posts when they're live to a text channel",
    example: "twitchtracker RevenantEverest #bot-commands"
};