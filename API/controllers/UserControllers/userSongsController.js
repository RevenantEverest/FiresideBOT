const userSongsDB = require('../../models/UserModels/userSongsDB');
const youtubeServices = require('../../services/youtubeServices');
const YTDL = require('ytdl-core');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    userSongsDB.findAll()
      .then(songs => {
        res.json({
          message: "Getting songs",
          data: songs
        })
      })
      .catch(err =>  { console.log("Failed at Songs Index"); next(err); });
  },
  getByPlaylistId(req, res, next) {
    userSongsDB.findByPlaylistId(req.params.id)
      .then(songs => {
        if(songs.length < 1) return;
        res.json({
          message: "Finding songs by playlist",
          data: songs
        })
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Songs Found",
            data: [{}]
          })
        }
        else next(err);
      });
  },
  getOne(req, res, next) {
    userSongsDB.findOne(req.params.id)
      .then(song => {
        res.json({
          message: "Getting song",
          data: song
        })
      })
      .catch(err => { console.log("Failed at Songs Get One"); next(err); });
  },
  addSong(req, res, next) {
    let songData = {};
    songData.playlist_id = req.body.playlist_id;
    if(req.body.link.includes('https://youtube.com') || req.body.link.includes("https://www.youtube.com") || req.body.link.includes('http://youtube.com')) {
      YTDL.getInfo(songData.link, (err, info) => {
        songData.title = info.title;
        songData.link = req.body.link;
        songData.duration = info.length_seconds;
        songData.author = info.author.name;
        songData.thumbnail_url = info.thumbnail_url;

        userSongsDB.save(songData).then(results => {
            res.json({ message: "Adding Song", data: results })
          })
      })
    }else {
      youtubeServices.youtubeSearch(req.body.link)
        .then(results => {
          songData.link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
          songData.title = results.data.items[0].snippet.title;
          YTDL.getInfo(songData.link, (err, info) => {
            songData.duration = info.length_seconds;
            songData.author = info.author.name;
            songData.thumbnail_url = info.thumbnail_url;

            userSongsDB.save(songData).then(results => {
                res.json({message: "Adding Song", data: results})
              });
          });
        })
        .catch(err => { console.log("Failed at Songs Add Song"); next(err); });
    }
  },
  delete(req, res, next) {
    userSongsDB.destroy(req.params.id)
      .then(results => {
        res.json({
          message: "Song Deleted"
        })
      })
      .catch(err => { console.log("Failed at Songs Delete"); next(err); });
  }
};
