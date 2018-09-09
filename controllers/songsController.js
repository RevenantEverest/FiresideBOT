const songsDB = require('../models/songsDB');

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
  }
};
