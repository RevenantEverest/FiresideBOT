module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!server.dispatcher || server.queue.isPlaying === false)
      return message.channel.send("No song to resume.");
    if(server.queue.isPlaying === true && server.queue.isPaused === true) {
      server.queue.isPaused = false;
      server.dispatcher.resume();
      message.channel.send('Resuming ' + "`" + `${server.queue.currentSongInfo.title}` + "`");
    }
};

module.exports.config = {
    name: 'resume',
    d_name: 'Resume',
    aliases: ['unpause'],
    category: 'Music',
    desc: 'Resumes any previously paused music',
    example: 'resume'
};