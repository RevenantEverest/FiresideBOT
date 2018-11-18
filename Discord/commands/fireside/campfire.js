const playSong = require('../music/playSong');

module.exports = {
  craftCampfire(message, args, server) {
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    server.queue.queueInfo.push({title: 'Campfire', link: 'https://www.youtube.com/watch?v=bbLDfueL7eU', requestedBy: message.author.username});
    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
      playSong.playSong(connection, message);
    })
  }
}
