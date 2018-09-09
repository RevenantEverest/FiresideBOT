const playlistsDB = require('../models/playlistsDB');

module.exports = {
  index(req, res, next) {
    playlistsDB.findAll()
      .then(playlists => {
        res.json({
          message: "Getting Playlists",
          data: playlists
        })
      })
      .catch(err => next(err));
  },
  getOne(req, res, next) {
    playlistDB.findOne(req.params.id)
      .then(playlist => {
        res.json({
          message: "Getting playlist by user id",
          data: playlist
        })
      })
      .catch(err => next(err));
  },
  getOneByUserId(req, res, next) {
    playlistDB.findByUserId(req.params.id)
      .then(playlists => {
        res.json({
          message: "Getting playlist by user id",
          data: playlists
        })
      })
      .catch(err => next(err));
  },
  create(req, res, next) {
    playlistsDB.save(req.body)
      .then(playlist => {
        res.json({
          message: "Saving Playlist",
          data: playlist
        })
      })
      .catch(err => next(err));
  }
};
