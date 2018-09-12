const songsDB = require('../models/songsDB');
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
    let songData = {playlist_id: req.body.playlist_id, link: req.body.link, title: ''};
    YTDL.getInfo(songData.link, (err, info) => {
      songData.title = info.title;
      songsDB.save(songData)
        .then(results => {
          res.json({
            message: "Adding Song",
            data: results
          })
        })
        .catch(err => next(err));
    })
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
