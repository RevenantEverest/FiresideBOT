const YTDL = require('ytdl-core');
const youtubeServices = require('../../../services/youtubeServices');
const playSong = require('./playSong');

module.exports = {
  play(message, args, server) {
    if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");

    // TODO: Fix Link Requests
    //Link Requests
    if(args[1].startsWith('http')) {
      server.queue.links.push(args[1]);
      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
        playSong.playSong(connection, message);
      })
      .catch(err => console.log(err));

    // Search Requests
    }else {
      let songRequest = '';
      for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
      youtubeServices.youtubeSearch(songRequest)
        .then(results => {
          if(results.data.items[0] === undefined) return message.channel.send("An error has occured");
          let queueInfo = {
            title: results.data.items[0].snippet.title,
            link: `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`,
            requestedBy: message.author.username
          }
          server.queue.queueInfo.push(queueInfo);
          message.channel.send(`${results.data.items[0].snippet.title} was added to the queue.`)
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
            playSong.playSong(connection, message);
          })
        })
        .catch(err => console.log(err));
    }
  }
};
