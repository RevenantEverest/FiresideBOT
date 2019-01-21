module.exports = async (str) => {
    const blacklist = ['official', 'music', 'video', 'lyric', 'lyrics', 'audio', 'monstercat', 'release', 'version', 'HD'];
    const re = new RegExp(`\\b(?:${blacklist.join("|")})\\b|[^a-z0-9 ]`, "gi");
    const extraBetterSearch = str.replace(re, '').replace(/ +/g, " ");

    return extraBetterSearch.trim();
};