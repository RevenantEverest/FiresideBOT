const Discord = require('discord.js');
const twitchServices = require('../../services/twitchServices');

async function checkStreamStatus(args, message, info) {
    twitchServices.getTwitchStreamStatus(args[1])
        .then(streamStatus => {
            if(streamStatus.data.stream) {
                info.isStreaming = true;
                info.currentViewers = streamStatus.data.stream.viewers;
                info.average_fps = streamStatus.data.stream.average_fps;
                info.resolution = streamStatus.data.stream.video_height;
                info.stream_type = streamStatus.data.stream.stream_type;

                sendTwitchUserInfo(args, message, info);
            }
            else {
                info.isStreaming = false;
                sendTwitchUserInfo(args, message, info);
            } 
        })
        .catch(err => console.error(err));

};

async function getTwitchInfo(args, message) {
    twitchServices.getTwitchInfo(args[1])
        .then(results => {
            let info = {
                display_name: results.data.display_name,
                status: results.data.status,
                game: results.data.game,
                totalViews: results.data.views,
                followers: results.data.followers,
                broadcaster_lang: results.data.broadcaster_language,
                partner: results.data.partner,
                mature: results.data.mature,
                logo: results.data.logo
            };
            checkStreamStatus(args, message, info);
        })
        .catch(err => {
            if(err.response.status === 404)
                message.channel.send('No Twitch User Found');
            else console.error(err);
        })
};

async function sendTwitchUserInfo(args, message, info) {
    let embed = new Discord.RichEmbed();
    embed.setTitle(`Twitch Info for **${info.display_name}**`).setColor(0x6600ff).addBlankField();
    if(info.isStreaming) {
        embed
        .addField('Title:', info.status)
        .addField('Playing:', info.game, true)
        .addField('Current Viewers: ', info.currentViewers.toLocaleString(), true)
        .addField('Total Views:', info.totalViews.toLocaleString(), true)
        .addField('Followers: ', info.followers.toLocaleString(), true)
        .addField('Resolution', `${info.resolution} ${info.average_fps}FPS`, true)
        .addField('Partnered:', (info.partner ? 'Yes' : 'No'), true)
        .addField('Mature Audience: ', (info.mature ? 'Yes' : 'No'), true)
        // .addField()
    }else if(!info.isStreaming) {
        embed
        .addField('Total Views:', info.totalViews.toLocaleString(), true)
        .addField('Followers: ', info.followers.toLocaleString(), true)
    }

    embed
    .addField('Language: ', info.broadcaster_lang.toUpperCase(), true)
    .setThumbnail(info.logo)
    .setFooter('Powered By Twitch API', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Ficonza-circle-social%2F64%2F697028-twitch-512.png&f=1')

    message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    getTwitchInfo(args, message);
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