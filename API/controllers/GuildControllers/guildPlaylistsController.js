const guildPlaylistDB = require('../../models/GuildModels/guildPlaylistsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    guildPlaylistDB.findAll()
      .then(playlists => {
        res.json({
          message: "Getting Guild Playlists",
          data: playlists
        })
      })
      .catch(err => { console.log("Failed at Guild Playlist Index"); next(err); });
  },
  getOne(req, res, next) {
    guildPlaylistDB.findOne(req.params.id)
      .then(playlist => {
        res.json({
          message: "Getting playlist by playlist id",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Get One"); next(err); });
  },
  getByGuildId(req, res, next) {
    guildPlaylistDB.findByGuildId(req.params.id)
      .then(playlists => {
        res.json({
          message: "Getting playlist by guild id",
          data: playlists
        })
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Guild Playlist Found",
            QRE: 0
          })
        } else {
          console.log("Failed at Playlist Get By Guild Id");
          next(err);
        }
      });
  },
  getByPlaylistName(req, res, next) {
    guildPlaylistDB.findByPlaylistName(req.params.playlist_name)
      .then(playlist => {
        res.json({
          message: "Getting Guild Playlist By Name",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Get By Playlist Name"); next(err); });
  },
  create(req, res, next) {
    guildPlaylistDB.save(req.body)
      .then(playlist => {
        res.json({
          message: "Saving Playlist",
          data: playlist
        })
      })
      .catch(err => { console.log("Failed at Playlist Create"); next(err); });
  },
  destroy(req, res, next) {
    guildPlaylistDB.delete(req.params.id)
      .then().catch(err => { console.log("Failed at Playlist Destroy"); next(err); });
  }
}
