const lastfmServices = require('../../services/lastfmServices');
const youtubeServices = require('../../services/youtubeServices');
const YTDL = require('ytdl-core');
const utils = require('./utils');
const errorHandler = require('../../controllers/errorHandler');

/*

    Check if recommendations is on
    Store song genres
    Send most used genre to API
    Send response to PlaySong util

*/

async function youtubeSearch(bot, message, server, songRequest, resolve, reject) {
    youtubeServices.youtubeSearch(songRequest)
      .then(results => {
        if(results.data.items[0] === undefined) {
          message.guild.voiceConnection.disconnect();
          return message.channel.send("An error has occured");
        }
        YTDL.getInfo(`https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`, (err, info) => {
          if(err) errorHandler(bot, message, err, "YTDL Error", "HandleRecommendations");
          if(info === undefined) return message.channel.send("An Error has occured, sorry for the inconvenience.");
          if(info.length_seconds >= 3600) return message.channel.send('Requests limited to 1 hour');
          server.queue.queueInfo.push({
            title: results.data.items[0].snippet.title,
            link: `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`,
            author: info.author.name,
            duration: info.length_seconds,
            thumbnail: info.thumbnail_url,
            requestedBy: '**Autoplay Request**'
          });
          return resolve();
        })
      })
      .catch(err => {
        if(err.response.status === 400) {
          message.channel.send('Invalid Search Request');
          console.log(err);
          return reject();
        }
      });
}

module.exports = async (bot, message, server, resolve, reject) => {
    let genre = utils.mode(server.queue.genres);
    lastfmServices.getSongsByGenre(genre)
        .then(results => {
            let RNG = Math.floor(Math.random() * results.data.tracks.track.length);
            let title = results.data.tracks.track[RNG].name;
            let artist = results.data.tracks.track[RNG].artist.name;

            youtubeSearch(bot, message, server, (`${title} ${artist}`), resolve, reject);

        })
        .catch(err => {
          errorHandler(bot, message, err, "LastFM Error", "HandleRecommendations");
          return reject();
        });
};