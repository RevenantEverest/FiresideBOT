const songsDB = require('../models/songsDB');
const youtubeServices = require('../services/youtubeServices');
const YTDL = require('ytdl-core');

module.exports = {
  index(req, res, next) {
    songsDB.findAll()
      .then(songs => {
        res.json({
          message: "Getting songs",
          data: songs
        })
      })
      .catch(err =>  next(err));
  },
  getByPlaylistId(req, res, next) {
    songsDB.findByPlaylistId(req.params.id)
      .then(songs => {
        if(songs.length < 1) return;
        res.json({
          message: "FInding songs by playlist",
          data: songs
        })
      })
      .catch(err => next(err));
  },
  getOne(req, res, next) {
    songsDB.findOne(req.params.id)
      .then(song => {
        res.json({
          message: "Getting song",
          data: song
        })
      })
      .catch(err => next(err));
  },
  addSong(req, res, next) {
    let songData = {playlist_id: req.body.playlist_id, link: req.body.link, title: '', duration: ''};
    if(req.body.link.startsWith("http")) {
      YTDL.getInfo(songData.link, (err, info) => {
        songData.title = info.title;
        songData.duration = info.length_seconds;
        songsDB.save(songData)
          .then(results => {
            res.json({
              message: "Adding Song",
              data: results
            })
          })
          .catch(err => next(err));
      })
    }else {
      youtubeServices.youtubeSearch(req.body.link)
        .then(results => {
          songData.link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
          songData.title = results.data.items[0].snippet.title;
          YTDL.getInfo(songData.link, (err, info) => {
            songData.duration = info.length_seconds;
            songsDB.save(songData)
              .then(results => {
                res.json({
                  message: "Adding Song",
                  data: results
                })
              })
              .catch(err => next(err));
          });
        })
        .catch(err => next(err));
    }
  },
  delete(req, res, next) {
    songsDB.destroy(req.params.id)
      .then(results => {
        res.json({
          message: "Song Deleted"
        })
      })
      .catch(err => next(err));
  }
};
