const services = {};

services.checkString = async (str, arr) => {
    const re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
    return re.test(str);
};

services.filter = async (str, options) => {
    let re = null;
    if(options.special) re =  /(?:https?:\/\/(?:www\.)?(?:youtu\.be|youtube\.com)\/(?:watch\?v=)?([^ ]*))|([a-z0-9 _]*)/i;
    else re =  /(?:https?:\/\/(?:www\.)?(?:youtu\.be|youtube\.com)\/(?:watch\?v=)?([^ ]*))/i;
    let ret = re.exec(str);
    if(!ret) return str;
    return ret[2] || ret[1];
};

module.exports = services;