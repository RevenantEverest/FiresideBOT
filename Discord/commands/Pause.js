module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!server.dispatcher || server.queue.isPlaying === false)
      return message.channel.send("No song to pause.");
    if(server.queue.isPlaying === true && server.queue.isPaused === false) {
      server.queue.isPaused = true;
      server.dispatcher.pause();
      message.channel.send('Pausing: ' + "`" + `${server.queue.currentSongInfo.title}` + "`");
    }
};

module.exports.config = {
    name: 'pause',
    d_name: 'Pause',
    aliases: [],
    params: { required: false, optional: false, params: '' },
    category: ['music', 'Music'],
    desc: 'Pauses music'
};