const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const handleRecommendations = require('./handleRecommendations');
const filter = require('./filter');

const apiServices = require('../../services/apiServices');

const volume = require('../Music/Volume');


async function getGenre(server) {
  let filterArr = ['official', 'music', 'video', 'lyric', 'lyrics', 'audio', 'monstercat', 'release', 'version', 'HD'];
  let search = await filter(server.queue.currentSongInfo.title, filterArr);
  apiServices.getTrack({ track: search })
    .then(results => {
      if(!results.data.results.trackmatches.track[0]) return;
      apiServices.getSongInfo({ track: results.data.results.trackmatches.track[0].name, artist: results.data.results.trackmatches.track[0].artist })
        .then(songInfo => {
          if(!songInfo.data.track) return;
          if(songInfo.data.track.toptags.tag[0]) {
            server.queue.genres.push(songInfo.data.track.toptags.tag[0].name)
          }
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

module.exports = {
  playSong(connection, message) {
    let currentSongEmbed = new Discord.RichEmbed();
    let server = config.servers[message.guild.id];
    let request = server.queue.queueInfo[0];

    if(server.queue.isPaused === true) server.queue.isPaused = false;
    if(server.queue.isPlaying === false) server.queue.isPlaying = true;

    server.dispatcher = connection.playStream(YTDL(request.link, {filter: 'audioonly', quality: 'highestaudio'}));
    volume.run('', message, (['', server.queue.options.volume]), server, '');

    let minutes = Math.floor(request.duration / 60);
    let seconds = Math.floor(request.duration - minutes * 60);

    if(!request) return;
    currentSongEmbed
      .setTitle('**CURRENT SONG**')
      .addField(request.title, request.author)
      .addField('Link', `[Click Me](${request.link}) \nRequested By: ${request.requestedBy}`)
      .setThumbnail(request.thumbnail)
      .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
      .setColor(0x0be289)
    message.channel.send(currentSongEmbed);

    

    server.queue.currentSongEmbed[0] = currentSongEmbed;
    server.queue.currentSongInfo = {
      title: server.queue.queueInfo[0].title,
      link: server.queue.queueInfo[0].link,
      requestedBy: server.queue.queueInfo[0].requestedBy
    }

    if(server.queue.options.loop)
      server.queue.queueInfo.push({
        title: server.queue.queueInfo[0].title,
        link: server.queue.queueInfo[0].link,
        author: server.queue.queueInfo[0].author,
        duration: server.queue.queueInfo[0].duration,
        thumbnail: server.queue.queueInfo[0].thumbnail,
        requestedBy: server.queue.queueInfo[0].requestedBy
      });

    server.queue.queueInfo.shift();

    getGenre(server);

    server.dispatcher.on("end", () => {
      if(server.queue.queueInfo[0] && message.guild.voiceConnection)
        this.playSong(connection, message);
      else {
        if(server.queue.options.recommendations) {
          let promise = new Promise((resolve, reject) => {
            handleRecommendations(message, server, resolve, reject);
          });
          promise.then(() => {
            this.playSong(connection, message);
          })
        }
        else {
          server.queue.queueInfo = [];
          server.queue.currentSongEmbed[0] = '';
          server.queue.currentSongInfo = {};
          connection.disconnect();
          server.queue.isPlaying = false;
          server.queue.genres = [];
          message.channel.send('Queue concluded.');
        }
      }
    });
  }
}