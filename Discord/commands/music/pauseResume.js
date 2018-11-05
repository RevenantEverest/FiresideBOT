module.exports = {
  handlePause(message, args, server) {
    if(!server.dispatcher || server.queue.isPlaying === false)
      return message.channel.send("No song to pause.");
    if(server.queue.isPlaying === true) {
      server.dispatcher.pause();
      message.channel.send('Pausing ' + "```css\n" + `${server.queue.currentSongInfo.title}` + "\n```");
    }
  },
  handleResume(message, args, server) {
    if(!server.dispatcher || server.queue.isPlaying === false)
      return message.channel.send("No song to resume.");
    if(server.queue.isPlaying === true) {
      server.dispatcher.resume();
      message.channel.send('Resuming ' + "```css\n" + `${server.queue.currentSongInfo.title}` + "\n```");
    }
  }
}
