const YTDL = require('ytdl-core');
const youtubeServices = require('../services/youtubeServices');
const services = {};

services.youtubeSearch = async (songRequest, options, callback, errCallback) => {
    let link = options.isLink ? `https://www.youtube.com/watch?v=${songRequest}` : '';
    if(options.isLink) return this.YTDL_GetInfo(link, callback);
    
    youtubeServices.youtubeSearch(songRequest)
    .then(results => {
        if(results.data.items.length < 1) return message.channel.send("No results found");
        this.YTDL_GetInfo(`https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`, callback, errCallback);
    })
    .catch(err => {
        if(err.response) {
            switch(err.response.status) {
                case 403:
                    return errCallback("YouTube Search Error 403: Forbidden");
                default:
                    return errCallback("YouTube Search Error");
            };
        }
        else errCallback("YouTube Search Error");
    });
};

services.YTDL_GetInfo = async (link, callback, errCallback) => {
    YTDL.getBasicInfo(link, (err, info) => {
        if(err) {
            if(err.toString() === "Error: This video is unavailable.") 
                return errCallback("This video is unavailable");
            else if(err.toString().split(":")[0] === "TypeError")
                return errCallback("Invalid search request");
            else 
                return errCallback("YTDL Error", "Utils");
        };
        if(info.player_response.videoDetails === undefined) return errCallback(`Invalid Video Details`);
    
        info = info.player_response.videoDetails;
        let thumbnails = info.thumbnail.thumbnails;
        let songInfo = { 
            title: info.title, 
            link: link, 
            author: info.author, 
            duration: info.lengthSeconds, 
            thumbnail_url: thumbnails[thumbnails.length - 1].url
        }
        callback(songInfo);
    });
};

module.exports = services;