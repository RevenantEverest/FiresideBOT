const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    userPlaylistsDB.findAll()
    .then(playlists => res.json({message: "Getting Playlists", data: playlists}))
    .catch(err => next(err));
  },
  getOne(req, res, next) {
    userPlaylistsDB.findOne(req.params.id)
    .then(playlist => res.json({message: "Getting playlist by user id", data: playlist}))
    .catch(err => next(err));
  },
  getByDiscordId(req, res, next) {
    userPlaylistsDB.findByDiscordId(req.params.id)
    .then(playlists => res.json({ message: "Getting playlists by Discord ID", data: playlists }))
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData) 
        res.json({ message: "No Playlists Found", data: [] });
      else next(err);
    })
  },
  getByPlaylistName(req, res, next) {
    userPlaylistsDB.findByPlaylistName(req.params.playlist_name)
    .then(playlist => res.json({message: "Getting Playlist By Name", data: playlist}))
    .catch(err => next(err));
  },
  getByDiscordIdAndPlaylistName(req, res, next) {
    userPlaylistsDB.findByDiscordIdAndPlaylistName(req.params.id, req.params.name)
    .then(playlist => res.json({ message: "Getting by Discord Id and Playlist Name", data: playlist }))
    .catch(err => next(err));
  },
  create(req, res, next) {
    userPlaylistsDB.save(req.body)
    .then(playlist => res.json({message: "Saving Playlist", data: playlist}))
    .catch(err => next(err));
  },
  destroy(req, res, next) {
    userPlaylistsDB.delete(req.params.id)
    .then(() => {
      userSongsDB.deletePlaylistSongs(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
    })
    .catch(err => next(err));
  }
};
