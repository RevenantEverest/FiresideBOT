const youtubeServices = require('../../services/youtubeServices');
const YTDL = require('ytdl-core');
const Discord_Bot = require('../../Discord_Bot');
const errorHandler = require('../../controllers/errorHandler');

module.exports = {
    fortunes: [
        "Yes",
        "No",
        "Maybe",
        "If you believe hard enough",
        "Try asking again",
        "Sure",
        "Fair Enough",
        "Please stop",
        "Incorrect",
        "You got it",
        "Mhm",
        "這都是中文的。當然"
    ],
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
    async mode(arr) {
        if(arr.length == 0) return null;
        let modeMap = {};
        let maxEl = arr[0], maxCount = 1;
        for(let i = 0; i < arr.length; i++) {
            let el = arr[i];

            if(modeMap[el] == null) modeMap[el] = 1;
            else modeMap[el]++;  

            if(modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    },
    async timeParser(sec, format) {
        let d = Math.floor(sec / (3600 * 24));
        let h = Math.floor(sec % (3600 * 24) / 3600);
        let m = Math.floor(sec % 3600 / 60);
        let s = Math.floor(sec % 3600 % 60);

        let days = d > 0 ? `${d}` : '';
        let hours = h > 0 ? (h < 10 ? (d > 0 ? `${h.toString().padStart(2, '0')}` : `${h}`) : `${h}`) : '';
        let minutes = m > 0 ? (m < 10 ? (h > 0 ? `${m.toString().padStart(2, '0')}` : `${m}`) : `${m}` ) : '';
        let seconds = s > 0 ? (s < 10 ? `${s.toString().padStart(2, '0')}` : `${s}`) : '';

        if(format) 
            return `${d > 0 ? (d > 1 ? `${days} days, ` : `${days} day, `) : ''}` + 
                   `${h > 0 ? (h > 1 ? `${hours} hours, ` : `${hours} hour, `) : ''}` +
                   `${m > 0 ? (m > 1 ? `${minutes} minutes, ` : `${minutes} minute, `) : ''}` +
                   `${s > 0 ? (s > 1 ? `${seconds} seconds` : `${seconds} second`) : ''}`;
        else 
            return `${d > 0 ? `${days}:` : ''}${h > 0 ? `${hours}:` : (d > 0 ? '00' : '')}${m > 0 ? `${minutes}:` : (h > 0 ? '00' : '')}${s > 0 ? `${seconds}` : '00'}`;
    },
    async getDate() {
        let date = new Date();
        let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
        return `${date.toLocaleString('en-US', options)} EST`;
    },
    async calculateLevel(complexity, exp) {
        let constA = (complexity / 1.15);
        let constB = (complexity / -0.25);
        let constC = (complexity * (complexity + 3));
        let Level = Math.max( Math.floor( constA * Math.log(exp + constC ) + constB ), 1);
        return Level;
    },
    async arrDifference (arr1, arr2) {

        let arr = [];
        let diff = [];
    
        for (let i = 0; i < arr1.length; i++) {
            arr[arr1[i]] = true;
        }
    
        for (let i = 0; i < arr2.length; i++) {
            if (arr[arr2[i]]) delete arr[arr2[i]];
            else arr[arr2[i]] = true;
        }
    
        for (let k in arr) {
            diff.push(k);
        }
    
        return diff;
    },
    async shuffle(arr) {
        for(let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        return arr;
    },
    async youtubeSearch(message, args, server, songRequest, options, callback) {
        let link = options.isLink ? `https://www.youtube.com/watch?v=${songRequest}` : '';
        if(options.isLink) return this.YTDL_GetInfo(message, args, server, link, callback);
        
        youtubeServices.youtubeSearch(songRequest)
        .then(results => {
            if(results.data.items.length < 1) return message.channel.send("No results found");
            link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
            this.YTDL_GetInfo(message, args, server, link, callback);
        })
        .catch(err => errorHandler(Discord_Bot, message, err, "YouTube Search Error", "Utils"));
    },
    async YTDL_GetInfo(message, args, server, link, callback) {
        YTDL.getBasicInfo(link, (err, info) => {
            if(err) return errorHandler(Discord_Bot, message, err, "YTDL Error", "Utils")
            if(info.player_response.videoDetails === undefined) return message.channel.send(`Invalid Video Details`);

            info = info.player_response.videoDetails;
            let thumbnails = info.thumbnail.thumbnails;
            let songInfo = { 
                title: info.title, 
                link: link, 
                author: info.author, 
                duration: info.lengthSeconds, 
                thumbnail: thumbnails[thumbnails.length - 1].url, 
                requestedBy: message.author.username 
            }
            callback(songInfo);
        });
    }
};