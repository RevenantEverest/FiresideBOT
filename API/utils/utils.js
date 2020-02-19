const YTDL = require('ytdl-core');
const youtubeServices = require('../services/youtubeServices');

module.exports = {
    async timeParser(sec) {
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor(sec % 3600 / 60);
        let seconds = Math.floor(sec % 3600 % 60);

        let hDisplay = hours > 0 ? `${hours}:` : '';
        let mDisplay = minutes > 0 ? (minutes < 10 ? (hours > 0 ? `0${minutes}:` : `${minutes}:`) : `${minutes}:` ) : '';
        let sDisplay = seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}` ) : '';
        
        return hDisplay + mDisplay + sDisplay;
    },
    async getDate() {
        let date = new Date();
        let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
        return `${date.toLocaleString('en-US', options)} EST`;
    },
    async checkString(str, arr) {
        const re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
        return re.test(str);
    },
    async filter(str, options) {
        let re = null;
        if(options.special) re =  /(?:https?:\/\/(?:www\.)?(?:youtu\.be|youtube\.com)\/(?:watch\?v=)?([^ ]*))|([a-z0-9 _]*)/i;
        else re =  /(?:https?:\/\/(?:www\.)?(?:youtu\.be|youtube\.com)\/(?:watch\?v=)?([^ ]*))/i;
        let ret = re.exec(str);
        if(!ret) return str;
        return ret[2] || ret[1];
    },
    async youtubeSearch(songRequest, options, callback, errCallback) {
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
    },
    async YTDL_GetInfo(link, callback, errCallback) {
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
    }
};