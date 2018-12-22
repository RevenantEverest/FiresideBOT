module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(server.queue.isPlaying === false) return message.channel.send("No song currently playing");
    else return message.channel.send(server.queue.currentSongEmbed[0]);
};

module.exports.config = {
    name: 'np',
    aliases: ['currentsong', 'nowplaying', 'cs'],
    category: ['music', 'Music'],
    desc: ''
};