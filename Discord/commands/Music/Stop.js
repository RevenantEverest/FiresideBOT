module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!server.queue.queueInfo[0] && server.queue.isPlaying === false) return message.channel.send("No songs currently playing");
    if(message.guild.voiceConnection) {
        server.queue.genres = [];
        return message.guild.voiceConnection.disconnect();
    }
    if(!message.member.voiceChannel) return message.channel.send("Must be in a voice channel to stop.");
};

module.exports.config = {
    name: 'stop',
    d_name: 'Stop',
    aliases: [],
    category: 'Music',
    desc: 'Stops and clears the queue',
    example: 'stop'
};