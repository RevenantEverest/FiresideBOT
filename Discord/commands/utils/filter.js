module.exports = async (str, arr, options) => {
    let re = new RegExp;
    if(options.special)
        re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
    else
        re = new RegExp(`\\b(?:${arr.join("|")})\\b`, "gi");

    const extraBetterSearch = str.replace(re, '').replace(/ +/g, " ");
    return extraBetterSearch.trim();
};