const guildSongsDB = require('../../models/GuildModels/guildSongsDB');

module.exports = {
  index(req, res, next) {
    guildSongsDB.findAll()
      .then(songs => {
        res.json({
          message: "Getting songs",
          data: songs
        })
      })
      .catch(err =>  { console.log("Failed at Songs Index"); next(err); });
  },
  getByPlaylistId(req, res, next) {
    guildSongsDB.findByPlaylistId(req.params.id)
      .then(songs => {
        if(songs.length < 1) return;
        res.json({
          message: "Finding songs by playlist",
          data: songs
        })
      })
      .catch(err => { console.log("Failed at Songs Get By Playlist Id"); next(err); });
  },
  getOne(req, res, next) {
    guildSongsDB.findOne(req.params.id)
      .then(song => {
        res.json({
          message: "Getting song",
          data: song
        })
      })
      .catch(err => { console.log("Failed at Songs Get One"); next(err); });
  },
  addSong(req, res, next) {
    let songData = {playlist_id: req.body.playlist_id, link: req.body.link, title: '', duration: ''};
    if(req.body.link.startsWith("http")) {
      YTDL.getInfo(songData.link, (err, info) => {
        songData.title = info.title;
        songData.duration = info.length_seconds;
        guildSongsDB.save(songData)
          .then(results => {
            res.json({
              message: "Adding Song",
              data: results
            })
          })
      })
    }else {
      youtubeServices.youtubeSearch(req.body.link)
        .then(results => {
          songData.link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
          songData.title = results.data.items[0].snippet.title;
          YTDL.getInfo(songData.link, (err, info) => {
            songData.duration = info.length_seconds;
            guildSongsDB.save(songData)
              .then(results => {
                res.json({
                  message: "Adding Song",
                  data: results
                })
              })
          });
        })
        .catch(err => { console.log("Failed at Songs Add Song"); next(err); });
    }
  },
  delete(req, res, next) {
    guildSongsDB.destroy(req.params.id)
      .then(results => {
        res.json({
          message: "Song Deleted"
        })
      })
      .catch(err => { console.log("Failed at Songs Delete"); next(err); });
  }
}
