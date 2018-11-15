module.exports = {
  stop(message, args, server) {
    if(!server.queue.queueInfo[0] && server.queue.isPlaying === false) return message.channel.send("No songs currently playing");
    if(message.guild.voiceConnection) return message.guild.voiceConnection.disconnect();
    if(!message.member.voiceChannel) return message.channel.send("Must be in a voice channel to stop.");
  }
}
