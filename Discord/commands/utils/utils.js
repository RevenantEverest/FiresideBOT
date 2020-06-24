const youtubeServices = require('../../services/youtubeServices');
const YTDL = require('ytdl-core');
const Discord_Bot = require('../../Discord_Bot');
const errorHandler = require('../../controllers/errorHandler');

const htmlEntities = [
    {key: "&lsquo;", value: "‘"},
    {key: "&rsquo;", value: "’"},
    {key: "&sbquo;", value: "‚"},
    {key: "&ldquo;", value: "“"},
    {key: "&rdquo;", value: "”"},
    {key: "&bdquo;", value: "„"},
    {key: "&circ;", value: "&circ;"},
    {key: "&#038;", value: "&"},
    {key: "&#039;", value: "'"},
    {key: "&#034;", value: '"'},
    {key: "&quot;", value: '"'}
];

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
    thanosQuotes: [
        "Fun isn’t something one considers when balancing the universe. But this… does put a smile on my face.",
        "This… does put a smile on my face.",
        "Perfectly balanced, as all things should be.",
        "The end is near.",
        "You should have gone for the head.",
        `I know what it’s like to lose. To feel so desperately that you’re right, yet to fail nonetheless. Dread it. Run from it. Destiny still arrives. Or should I say, I have.`,
        `Going to bed hungry. Scrounging for scraps. Your planet was on the brink of collapse. I was the one who stopped that. You know what’s happened since then? The children born have known nothing but full bellies and clear skies. It’s a paradise.`,
        "I ignored my destiny once, I can not do that again. Even for you. I’m sorry Little one.",
        "Your optimism is misplaced, Asgardian.",
        "The hardest choices require the strongest wills.",
        "You should choose your words wisely",
        "The work is done. I won. What I’m about to do, I’m gonna enjoy it. Very, very much!",
        "I am… inevitable.",
        "You could not live with your own failure, and where did that bring you? Back to me.",
        "I don’t even know who you are.",
        "You’re strong. But I could snap my fingers, and you’d all cease to exist.",
        "You have my respect, Stark. When I’m done, half of humanity will still be alive. I hope they remember you."
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
    async replaceHTMLEntitiy(str) {
        let re = new RegExp(`${htmlEntities.map(el => el.key).join("|")}`, "gi");
        let keys = str.match(re);
        if(keys) keys.forEach(el => str = str.replace(el, htmlEntities.filter(ent => ent.key === el)[0].value));
        return str;
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
    async isString(x) {
        return Object.prototype.toString.call(x) === "[object String]"
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
        .catch(err => {
            if(err.response) {
                switch(err.response.status) {
                    case 403:
                        errorHandler(Discord_Bot, message, err, "YouTube Search Error 403: Forbidden", "Utils");
                        break;
                    default:
                        errorHandler(Discord_Bot, message, err, "YouTube Search Error", "Utils");
                        break;
                };
            }
            else errorHandler(Discord_Bot, message, err, "YouTube Search Error", "Utils");
        });
    },
    async YTDL_GetInfo(message, args, server, link, callback) {
        YTDL.getBasicInfo(link, (err, info) => {
            if(err) {
                console.log(err.toString());
                if(err.toString() === "Error: This video is unavailable.") 
                    return message.channel.send("This video is unavailable");
                else if(err.toString().split(":")[0] === "TypeError")
                    return message.channel.send("Invalid search request");
                else 
                    return errorHandler(Discord_Bot, message, err, "YTDL Error", "Utils")
            };
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