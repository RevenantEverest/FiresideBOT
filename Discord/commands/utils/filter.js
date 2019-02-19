module.exports = async (str, arr) => {
    const re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
    const extraBetterSearch = str.replace(re, '').replace(/ +/g, " ");

    return extraBetterSearch.trim();
};