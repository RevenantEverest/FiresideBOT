module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let RNG = Math.floor(Math.random() * 100);
    message.channel.send(RNG > 50 ? "Looking good, you passed the vibe check" : "Oh no...you didn't pass your vibe check")
};

module.exports.config = {
    name: 'vibe',
    d_name: 'Vibe',
    aliases: ['vibecheck'],
    category: 'Fun',
    desc: 'Checks your current vibe',
    example: 'vibe'
};