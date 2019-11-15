const Discord = require('discord.js');
const twitchServices = require('../../services/twitchServices');

const errorHandler = require('../../controllers/errorHandler');

async function getTwitchGame(bot, message, info, id) {
    twitchServices.getTwitchGame(id)
    .then(game => {
        info.game = game.data.data[0] ? game.data.data.name : "No Game";
        sendTwitchUserInfo(message, info);
    })
    .catch(err => errorHandler(bot, message, err, "Twitch API Error", "TwitchInfo"));
}

async function checkStreamStatus(bot, args, message, info) {
    twitchServices.getTwitchStreamStatus(args[1])
        .then(async streamStatus => {
            streamStatus = streamStatus.data.data[0];
            if(streamStatus.type) {
                info.isStreaming = true;
                info.title = streamStatus.title;
                info.currentViewers = streamStatus.viewer_count;
                info.type = streamStatus.type;
                info.broadcaster_lang = streamStatus.language;

                getTwitchGame(bot, message, info, streamStatus.game_id);
            }
            else {
                info.isStreaming = false;
                sendTwitchUserInfo(message, info);
            } 
        })
        .catch(err => errorHandler(bot, message, err, "Twitch API Error", "TwitchInfo"));

};

async function getTwitchInfo(bot, args, message) {
    twitchServices.getTwitchInfo(args[1])
        .then(results => {
            results = results.data.data[0];
            let info = {
                display_name: results.display_name,
                totalViews: results.view_count,
                followers: results.followers,
                boradcaster_type: results.boradcaster_type,
                mature: results.mature,
                logo: results.profile_image_url
            };
            checkStreamStatus(bot, args, message, info);
        })
        .catch(err => {
            if(err.response.status === 404)
                message.channel.send('No Twitch User Found');
            else errorHandler(bot, message, err, "Twitch API Error", "TwitchInfo");
        })
};

async function sendTwitchUserInfo(message, info) {
    let embed = new Discord.RichEmbed();
    embed
    .setTitle(`Twitch Info for **${info.display_name}**`)
    .setColor(0x6600ff)
    .addBlankField();
    if(info.isStreaming)
        embed
        .addField('Title:', info.title)
        .addField('Playing:', info.game, true)
        .addField('Current Viewers: ', info.currentViewers.toLocaleString(), true)
        // .addField('Total Views:', info.totalViews.toLocaleString(), true)
        // .addField('Followers: ', info.followers.toLocaleString(), true)
        // .addField('Resolution', `${info.resolution} ${info.average_fps}FPS`, true)
        // .addField('Partnered:', (info.b ? 'Yes' : 'No'), true)
        // .addField('Mature Audience: ', (info.mature ? 'Yes' : 'No'), true)
    else if(!info.isStreaming)
        embed
        // .addField('Total Views:', info.totalViews.toLocaleString(), true)
        // .addField('Followers: ', info.followers.toLocaleString(), true)

    embed
    .addField('Language: ', info.broadcaster_lang.toUpperCase(), true)
    .setThumbnail(info.logo)
    .setFooter('Powered By Twitch API', 'https://i.imgur.com/DwmLOBU.png')

    message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    getTwitchInfo(bot, args, message);
};

module.exports.config = {
    name: 'twitchinfo',
    d_name: 'TwitchInfo',
    aliases: ['ti', 'twitch'],
    params: {required: true, params: 'Twitch Username'},
    category: 'Info',
    desc: 'Displays relevant info about a Twitch User',
    example: 'twitchinfo RevenantEverest'
}