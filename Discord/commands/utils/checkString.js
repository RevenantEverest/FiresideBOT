module.exports = async (str, arr) => {
    const re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
    return re.test(str);
};