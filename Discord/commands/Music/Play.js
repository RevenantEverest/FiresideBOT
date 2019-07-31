const config = require('../../config/config');
const YTDL = require('ytdl-core');
const youtubeServices = require('../../services/youtubeServices');
const playSong = require('../utils/playSong');
const utils = require('../utils/utils');
 
async function youtubeSearch(message, args, server, songRequest) {
  youtubeServices.youtubeSearch(songRequest)
    .then(results => {
      if(results.data.items.length < 1) return message.channel.send("No results found");
      let link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
      console.log(results.data.items[0].id.videoId)
      YTDL_GetInfo(message, args, server, link);
    })
    .catch(err => {
      if(err.response.status === 400) {
        message.channel.send('Invalid Search Request');
        console.error(err)
      }
    });
}

async function YTDL_GetInfo(message, args, server, link) {
  YTDL.getBasicInfo(link, (err, info) => {
    if(err) return message.channel.send("YTDL Get Info error.");
    console.log(info.player_response.videoDetails)
    if(info.player_response.videoDetails === undefined) return message.channel.send(`Invalid Video Details`);
    if(info.player_response.videoDetails.lengthSeconds >= 3600) return message.channel.send('Requests limited to 1 hour');
    info = info.player_response.videoDetails;
    let thumbnails = info.thumbnail.thumbnails;
    setQueue(message, args, server, { 
      title: info.title, 
      link: link, 
      author: info.author, 
      duration: info.lengthSeconds, 
      thumbnail: thumbnails[thumbnails.length - 1].url, 
      requestedBy: message.author.username
    })
  });
}

async function setQueue(message, args, server, {title, link, author, duration, thumbnail, requestedBy}) {
  server.queue.queueInfo.push({
    title: title, link: link, author: author, duration: duration, thumbnail: thumbnail, requestedBy: requestedBy
  });
  message.channel.send(`**${title}** was added to the queue. In position **#${server.queue.queueInfo.length}**`);
  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
    playSong.playSong(connection, message, server);
  })
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update")

    let request = '';
    const requestFilter = ['http://', 'https://', '\.com', 'watch\?v=', 'watch\?V=', 'youtube', 'www\.youtube', 'youtu\.be', '/'];
    args.splice(0, 1);

    await utils.checkString(args[0], requestFilter) ? request = await utils.filter(args[0], { special: false }) : request = args.join(" ");

    youtubeSearch(message, args, server, request);
};

module.exports.config = {
    name: 'play',
    d_name: 'Play',
    aliases: ['p'],
    params: { required: true, params: 'YouTube Link or Search Request' },
    category: 'Music',
    desc: 'Plays request',
    example: 'play kingdom hearts sanctuary'
}