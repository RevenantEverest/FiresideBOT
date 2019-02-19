const YTDL = require('ytdl-core');
const youtubeServices = require('../../../services/youtubeServices');
const playSong = require('../utils/playSong');

function YTDL_GetInfo(message, args, server, songRequest) {
    YTDL.getInfo(songRequest, (err, info) => {
      if(err) return message.channel.send("YTDL Get Info error.");
      if(info.title === undefined) return message.channel.send(`Can't read title of undefined`);
      if(info.length_seconds >= 3600) return message.channel.send('Requests limited to 1 hour');
      server.queue.queueInfo.push({
        title: info.title,
        link: args[1],
        author: info.author.name,
        duration: info.length_seconds,
        thumbnail: info.thumbnail_url,
        requestedBy: message.author.username
      });
      message.channel.send(`${info.title} was added to the queue.`)
      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
        playSong.playSong(connection, message);
      })
      .catch(err => {
        if(err.response.status === 400) {
          message.channel.send('Invalid Search Request');
          console.log(err)
        }
      });
    });
  };
  
  function youtubeSearch(message, args, server, songRequest) {
    youtubeServices.youtubeSearch(songRequest)
      .then(results => {
        if(results.data.items[0] === undefined) return message.channel.send("An error has occured");
        YTDL.getInfo(`https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`, (err, info) => {
          if(err) message.channel.send('YTDL Get Info error');
          if(info === undefined) return message.channel.send("An Error has occured, sorry for the inconvenience.");
          if(info.length_seconds >= 3600) return message.channel.send('Requests limited to 1 hour');
          server.queue.queueInfo.push({
            title: results.data.items[0].snippet.title,
            link: `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`,
            author: info.author.name,
            duration: info.length_seconds,
            thumbnail: info.thumbnail_url,
            requestedBy: message.author.username
          });
          message.channel.send(`${results.data.items[0].snippet.title} was added to the queue.`);
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
            playSong.playSong(connection, message);
          })
        })
      })
      .catch(err => {
        if(err.response.status === 400) {
          message.channel.send('Invalid Search Request');
          console.log(err)
        }
      });
  }

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    let songRequest = `${args[1]}`;
    
    if(args[1].includes("http")) {
        if(args[1].includes('https://youtube.com') || args[1].includes("https://www.youtube.com") || args[1].includes('http://youtube.com'))
            YTDL_GetInfo(message, args, server, songRequest);
        else return message.channel.send("You can only request YouTube links");
    }
    else {
        songRequest = '';
        for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
        youtubeSearch(message, args, server, songRequest);
    }
};

module.exports.config = {
    name: 'play',
    d_name: 'Play',
    aliases: [],
    params: { required: true, optional: false, params: 'YouTube Link or Search Request' },
    category: ['music', 'Music'],
    desc: 'Plays request'
}