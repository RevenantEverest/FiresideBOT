const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const handleRecommendations = require('./handleRecommendations');
const utils = require('./utils');
const errorHandler = require('../../controllers/errorHandler');

const lastfmServices = require('../../services/lastfmServices');

const volume = require('../Music/Volume');

const services = {};

async function getGenre(server) {
  let filterArr = ['official', 'music', 'video', 'lyric', 'lyrics', 'audio', 'monstercat', 'release', 'version', 'HD'];
  let search = await utils.filter(server.queue.currentSongInfo.title, filterArr, { special: true });
  lastfmServices.getTrack({ track: search })
    .then(results => {
      if(!results.data.results.trackmatches.track[0]) return;
      lastfmServices.getSongInfo({ track: results.data.results.trackmatches.track[0].name, artist: results.data.results.trackmatches.track[0].artist })
        .then(songInfo => {
          if(!songInfo.data.track) return;
          if(songInfo.data.track.toptags.tag[0]) {
            server.queue.genres.push(songInfo.data.track.toptags.tag[0].name)
          }
        })
        .catch(err => errorHandler(bot, message, err, "LastFM Error", "PlaySong"));
    })
    .catch(err => errorHandler(bot, message, err, "LastFM Error", "PlaySong"));
};

services.playSong = async (bot, connection, message, server) => {
  let currentSongEmbed = new Discord.RichEmbed();
  let request = server.queue.queueInfo[0];

  if(server.queue.isPaused === true) server.queue.isPaused = false;
  if(server.queue.isPlaying === false) server.queue.isPlaying = true;
  if(!request) return;

  /*
    Creates the dispatcher object from the Discord connection object.playStream
    Then sets the volume according to the servers saved volume
  */
  server.dispatcher = connection.playStream(YTDL(request.link, {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25}));
  volume.run('', message, (['PlaySong', server.queue.options.volume]), server, '');

  currentSongEmbed
    .setTitle('**CURRENT SONG**')
    .addField(request.title, request.author)
    .addField('Link', `[Click Me](${request.link}) \nRequested By: ${request.requestedBy}`)
    .setThumbnail(request.thumbnail)
    .setFooter(`Length: ${await utils.timeParser(request.duration)}`)
    .setColor(0x0be289)
  message.channel.send(currentSongEmbed);

  server.queue.currentSongEmbed = currentSongEmbed;
  server.queue.currentSongInfo = request;

  if(server.queue.options.loop) server.queue.queueInfo.push(request);

  server.queue.queueInfo.shift();

  getGenre(server);

  server.dispatcher.on("end", () => {
    if(server.queue.queueInfo[0] && message.guild.voiceConnection) 
      services.playSong(bot, connection, message, server);
    else {
      if(server.queue.options.recommendations) {
        let promise = new Promise((resolve, reject) => {
          handleRecommendations(bot, message, server, resolve, reject);
        });
        promise.then(() => {
          this.playSong(connection, message);
        })
      }
      else {
        server.queue.queueInfo = [];
        server.queue.currentSongEmbed = {};
        server.queue.currentSongInfo = {};
        connection.disconnect();
        server.queue.isPlaying = false;
        server.queue.genres = [];
        message.channel.send('Queue concluded.');
      }
    }
  });
}

module.exports = services;