const Discord = require('discord.js');
const twitchServicesController = require('../../controllers/servicesControllers/twitchServicesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let userQuery = args[1].toLowerCase();
    let info = null;

    twitchServicesController.getTwitchInfo(bot, message, "TwitchInfo", userQuery, handleTwitchInfo);

    async function handleTwitchInfo(twitchUser) {
        twitchUser = twitchUser.data.data[0];
        info = { 
            id: twitchUser.id, 
            display_name: twitchUser.display_name, 
            totalViews: twitchUser.view_count,
            broadcaster_type: twitchUser.broadcaster_type,
            logo: twitchUser.profile_image_url,
            offline_image_url: twitchUser.offline_image_url
        };
        twitchServicesController.getTwitchUserFollowers(bot, message, "TwitchInfo", twitchUser.id, (followers) => {
            info.followers = followers.data.total;
            twitchServicesController.getStreamStatus(bot, message, "TwitchInfo", userQuery, handleStreamStatus);
        });  
    };

    async function handleStreamStatus(streamStatus) {
        streamStatus = streamStatus.data.data[0];
        if(streamStatus) {
            info.isStreaming = true;
            info.title = streamStatus.title;
            info.currentViewers = streamStatus.viewer_count;
            info.type = streamStatus.type;
            info.language = streamStatus.language;
            info.thumbnail_url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${info.display_name.toLowerCase()}-600x338.jpg`;

            twitchServicesController.getTwitchGame(bot, message, "TwitchInfo", streamStatus.game_id, (game) => {
                info.game = game.data.data[0] ? game.data.data[0].name : "No Game";
                handleEmbed();
            });
        }
        else {
            info.isStreaming = false;
            handleEmbed();
        } 
    };

    async function handleEmbed() {
        let embed = new Discord.RichEmbed();

        embed
        .setAuthor(`${info.display_name} ${info.isStreaming ? "" : "[Offline]"}`, info.logo)
        .setThumbnail(info.logo)
        .setColor(0x6600ff)
        .setFooter('Powered By Twitch API', 'https://i.imgur.com/DwmLOBU.png')

        if(info.isStreaming)
            embed    
            .setDescription(`[${info.title}](https://twitch.tv/${info.display_name})`)
            .addField("Playing:", info.game)
            .addField("Viewers:", info.currentViewers.toLocaleString(), true)
            .setImage(info.thumbnail_url)
        else if(!info.isStreaming)
            embed
            .setImage(info.offline_image_url)

        embed
        .addField("Followers:", info.followers.toLocaleString(), true)
        .addField("Total Views:", info.followers.toLocaleString(), true)
        .addField("Account Type:", info.broadcaster_type.charAt(0).toUpperCase() + info.broadcaster_type.substr(1), true)
        message.channel.send(embed);
    };
};

module.exports.config = {
    name: 'twitchinfo',
    d_name: 'TwitchInfo',
    aliases: ['ti', 'twitch'],
    params: {required: true, params: 'Twitch Username'},
    category: 'Info',
    desc: 'Displays relevant info about a Twitch User',
    example: 'twitchinfo RevenantEverest'
};