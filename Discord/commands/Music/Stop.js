module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!server.queue.queueInfo[0] && server.queue.isPlaying === false) return message.channel.send("No songs currently playing");
    if(!message.member.voiceChannel) return message.channel.send("Must be in a voice channel to stop.");

    server.queue.queueInfo = [];
    server.queue.genres = [];
    server.queue.currentSongInfo = {};
    server.queue.currentSongEmbed = {};
    server.queue.isPlaying = false;
    
    if(message.guild.voiceConnection)
        return message.guild.voiceConnection.disconnect();
};

module.exports.config = {
    name: 'stop',
    d_name: 'Stop',
    aliases: [],
    category: 'Music',
    desc: 'Stops and clears the queue',
    example: 'stop'
};