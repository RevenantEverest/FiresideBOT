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
      .catch(err => { console.log("Failed at Playlist Index"); next(); });
  },
  getOne(req, res, next) {
    playlistsDB.findOne(req.params.id)
      .then(playlist => {
        res.json({
          message: "Getting playlist by user id",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Get One"); next(); });
  },
  getByUserId(req, res, next) {
    playlistsDB.findByUserId(req.params.id)
      .then(playlists => {
        res.json({
          message: "Getting playlist by user id",
          data: playlists
        })
      })
      .catch(err => { console.log("Failed at Playlist Get By User Id"); next(); });
  },
  getByPlaylistName(req, res, next) {
    playlistsDB.findByPlaylistName(req.params.playlist_name)
      .then(playlist => {
        res.json({
          message: "Getting Playlist By Name",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Get By Playlist Name"); next(); });
  },
  create(req, res, next) {
    playlistsDB.save(req.body)
      .then(playlist => {
        res.json({
          message: "Saving Playlist",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Create"); next(); });
  },
  destroy(req, res, next) {
    playlistsDB.delete(req.params.id)
      .then().catch(err => { console.log("Failed at Playlist Destroy"); next(); });
  }
};
