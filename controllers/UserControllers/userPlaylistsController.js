const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');

module.exports = {
  index(req, res, next) {
    userPlaylistsDB.findAll()
      .then(playlists => {
        res.json({
          message: "Getting Playlists",
          data: playlists
        })
      })
      .catch(err => { console.log("Failed at Playlist Index"); next(err); });
  },
  getOne(req, res, next) {
    userPlaylistsDB.findOne(req.params.id)
      .then(playlist => {
        res.json({
          message: "Getting playlist by user id",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Get One"); next(err); });
  },
  getByUserId(req, res, next) {
    userPlaylistsDB.findByUserId(req.params.id)
      .then(playlists => {
        res.json({
          message: "Getting playlist by user id",
          data: playlists
        })
      })
      .catch(err => { console.log("Failed at Playlist Get By User Id"); next(err); });
  },
  getByPlaylistName(req, res, next) {
    userPlaylistsDB.findByPlaylistName(req.params.playlist_name)
      .then(playlist => {
        res.json({
          message: "Getting Playlist By Name",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Get By Playlist Name"); next(err); });
  },
  getByDiscordIdAndPlaylistName(req, res, next) {
    userPlaylistsDB.findByDiscordIdAndPlaylistName(req.params.id, req.params.name)
      .then(playlist => {
        res.json({ message: "Getting by Discord Id and Playlist Name", data: playlist });
      })
      .catch(err => next(err));
  },
  getByDiscordId(req, res, next) {
    userPlaylistsDB.findByDiscordId(req.params.id)
      .then(playlists => {
        res.json({ message: "Getting playlists by Discord ID", data: playlists });
      })
      .catch(err => {
        //Handle QRE 0
        next(err);
      })
  },
  create(req, res, next) {
    userPlaylistsDB.save(req.body)
      .then(playlist => {
        res.json({
          message: "Saving Playlist",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Create"); next(err); });
  },
  destroy(req, res, next) {
    userPlaylistsDB.delete(req.params.id)
      .then().catch(err => { console.log("Failed at Playlist Destroy"); next(err); });
  }
};
