const services = {};

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

services.isString = async (x) => {
    return Object.prototype.toString.call(x) === "[object String]"
};

services.checkString = async (str, arr) => {
    const re = new RegExp(`(?:${arr.join("|")})`, "gi");
    return re.test(str);
};

services.filter = async (str, options) => {
    let re = null;
    if(options.youtubePlaylist) {
        re = /(?<=list=)(.*?)(?=\&|\/|$)/gi;
        str = re.exec(str)[1];
    }
    else {
        re = /https?\:\/\/(w{3})?\.?(youtube\.com|youtu\.be)\/(watch\?v=)?/gi;
        str = str.replace(re, "");
    }
    
    return str;
};

services.replaceHTMLEntitiy = async (str) => {
    let re = new RegExp(`${htmlEntities.map(el => el.key).join("|")}`, "gi");
    let keys = str.match(re);
    if(keys) keys.forEach(el => str = str.replace(el, htmlEntities.filter(ent => ent.key === el)[0].value));
    return str;
};

module.export = services;