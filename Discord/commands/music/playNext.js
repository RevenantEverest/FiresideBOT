const playSong = require('./playSong');

module.exports = {
  playNext(message, args, server) {
    if(args[1].startsWith('http')) {
      server.queue.links.splice(0, 0, args[1]);
      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
        playSong.playSong(connection, message);
      })
      .catch(err => console.log(err));
    }else {
      let songRequest = '';
      for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
      youtubeServices.youtubeSearch(songRequest)
        .then(results => {
          server.queue.titles.splice(0, 0, results.data.items[0].snippet.title);
          server.queue.links.splice(0, 0, `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`);
          message.channel.send(`${results.data.items[0].snippet.title} was added to the queue.`)
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
            playSong.playSong(connection, message);
          })
        })
        .catch(err => console.log(err));
      }
  }
}
