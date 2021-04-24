const Discord = require('discord.js');
const youtubeServices = require('../services/youtubeServices');
const services = {};

const isLiveRegex = /{"text":" watching"}/gi;
const channelIdRegex = /(?<=\?channel_id=)(.*?)(?=")/gi;
const channelNameRegex = /(?<=user\/)(.*?)(?=")/gi;
const titleRegex = /(?<="simpleText":")(.*?)(?=")/gi;
const thumbnailRegex = /(?<={"thumbnails":\[{"url":")(.*?)(?==)/gi;
const profileImageRegex = /(?<={"url":"https:\/\/yt3\.ggpht\.com\/ytc\/)(.*?)(?==)/gi;
const viewCountRegex = /(?<="viewCountText":{"runs":\[{"text":")(.*?)(?="})/gi;
const videoIdRegex = /(?<={"videoId":")(.*?)(?=")/gi;

services.run = async (bot) => {
    
    // youtubeServices.getChannelPage(channelURL)
    // .then(content => {
    //     if(isLiveRegex.exec(content.data.toString())) return services.parseChannelInfo(bot, content.data.toString());
    //     else console.log("No Match");
    // })
    // .catch(err => console.error(err));
};

services.parseChannelInfo = async (bot, content) => {
    let streamData = {
        channel_id: channelIdRegex.exec(content)[0],
        channelName: channelNameRegex.exec(content)[0],
        title: titleRegex.exec(content)[0],
        profileImage: "https://yt3.ggpht.com/ytc/" + profileImageRegex.exec(content)[0] + "=s176-c-k-c0x00ffffff-no-rj",
        thumbnail: thumbnailRegex.exec(content)[0],
        viewCount: viewCountRegex.exec(content)[0],
        videoURL: "https://youtube.com/watch?v=" + videoIdRegex.exec(content)[0]
    };

    let embed = new Discord.MessageEmbed();

    embed
    .setColor(0xff0000)
    .setAuthor(`${streamData.channelName} is now LIVE`, streamData.profileImage)
    .setThumbnail(streamData.profileImage)
    .setDescription(`[${streamData.title}](${streamData.videoURL})`)
    .addField("Viewers:", streamData.viewCount.toLocaleString())
    .setImage(streamData.thumbnail)
    .setFooter("Powered by FiresideBOT", bot.user.avatarURL({ dynamic: true }))

    bot.channels.resolve("427883469092159492").send(embed);
};

module.exports = services;