const YTDL = require('ytdl-core');
const youtubeServices = require('../../services/youtubeServices');
const playSong = require('../utils/playSong');
const utils = require('../utils/utils');

async function youtubeSearch(message, args, server, songRequest) {
  youtubeServices.youtubeSearch(songRequest)
    .then(results => {
      if(results.data.items.length < 1) return message.channel.send("No results found");
      let link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
      YTDL_GetInfo(message, args, server, link);
    })
    .catch(err => {
      if(err.response.status === 400) {
        message.channel.send('Invalid Search Request');
        console.error(err)
      }
    });
}

/*
  Uses the link passed in to grab more info about the request
  Parses the info and passes it on to SetQueue

  Checks if song length is longer than 1 hour
*/
async function YTDL_GetInfo(message, args, server, link) {
  YTDL.getInfo(link, (err, info) => {
    if(err) return message.channel.send("YTDL Get Info error.");
    if(info.title === undefined) return message.channel.send(`Can't read title of undefined`);
    if(info.length_seconds >= 3600) return message.channel.send('Requests limited to 1 hour');
    setQueue(message, args, server, { 
      title: info.title, link: link, author: info.author.name, duration: info.length_seconds, thumbnail: info.thumbnail_url, requestedBy: message.author.username
    })
  });
}

/* 
  Adds the song to the server queue 
  Checks if Fireside is in the channel
  If not, joins the channel and calls the PlaySong fucntion
*/
async function setQueue(message, args, server, {title, link, author, duration, thumbnail, requestedBy}) {
  server.queue.queueInfo.splice(0, 0, {
    title: title, link: link, author: author, duration: duration, thumbnail: thumbnail, requestedBy: requestedBy
  });
  message.channel.send(`**${title}** was added to the queue. In position **#1**`);
  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
    playSong.playSong(connection, message, server);
  })
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {

  if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update")

    const requestFilter = ['http://', 'https://', '.com', 'watch?v=', 'youtube', 'www.youtube', 'youtu.be', '/'];
    let request = '';
    args.splice(0, 1);

    await utils.checkString(args[0], requestFilter) ? request = await utils.filter(args[0], requestFilter, { special: false }) : request = args.join(" ");

    youtubeSearch(message, args, server, request);
};

module.exports.config = {
    name: 'playnext',
    d_name: 'PlayNext',
    aliases: ['pn'],
    params: { required: true, params: 'YouTube link or search' },
    category: 'Music',
    desc: 'Requests a song to play next in queue',
    example: 'playnext bring me the horizon can you feel my heart'
};