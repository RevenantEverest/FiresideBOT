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
    async filter(str, arr, options) {
        let re = null;
        if(options.special) re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
        else re = new RegExp(`\\b(?:${arr.join("|")})\\b`, "gi");

        return str.replace(re, '').replace(/ +/g, " ").trim();
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