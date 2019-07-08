module.exports = {
    fortunes: [
        "Yes",
        "No",
        "Maybe",
        "Fuck You",
        "If you believe hard enough",
        "Try asking again",
        "Kill Yourself",
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
        if(options.special) re =  /(?:https?:\/\/(?:www\.)?(?:youtu\.be|youtube\.com)\/(?:watch\?v=)?([^ ]*))|([a-z0-9 ]*)/i;
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
        // let d = Math.floor((sec / 3600) * 24);
        let d = Math.floor(sec / (60 * 60 * 24));
        let h = Math.floor(sec / 3600);
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
            return `${d > 0 ? `${days}:` : ''}${h > 0 ? `${hours}:` : ''}${m > 0 ? `${minutes}:` : ''}${s > 0 ? `${seconds}` : ''}`;
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
      }
};