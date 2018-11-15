module.exports = {
  handlePause(message, args, server) {
    if(!server.dispatcher || server.queue.isPlaying === false)
      return message.channel.send("No song to pause.");
    if(server.queue.isPlaying === true && server.queue.isPaused === false) {
      server.queue.isPaused = true;
      server.dispatcher.pause();
      message.channel.send('Pausing ' + "`" + `${server.queue.currentSongInfo.title}` + "`");
    }
  },
  handleResume(message, args, server) {
    if(!server.dispatcher || server.queue.isPlaying === false)
      return message.channel.send("No song to resume.");
    if(server.queue.isPlaying === true && server.queue.isPaused === true) {
      server.queue.isPaused = false;
      server.dispatcher.resume();
      message.channel.send('Resuming ' + "`" + `${server.queue.currentSongInfo.title}` + "`");
    }
  }
}
