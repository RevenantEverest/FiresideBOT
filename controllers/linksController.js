const playlistsDB = require('../models/playlistsDB');
const songsDB = require('../models/songsDB');
const YTDL = require('ytdl-core');

module.exports = {
  youtubeLinkInfo(req, res, next) {
    songsDB.findByPlaylistId(req.params.id)
      .then(songs => {
        let songData = [];
        let promise = new Promise((resolve, reject) => {
          for(let i = 0; i < songs.length; i++) {
            YTDL.getInfo(songs[i].link, (err, info) => {
              songData.push({ link: songs[i].link, title: info.title});
            })
          }
          setTimeout(() => {
            resolve("Success!")
            res.json({
              message: 'Getting Playlist Song Info',
              data: songData
            })
          }, 2000)
        })
      })
      .catch(err => { console.log("Failed at Links"); next(); });
  }
}
