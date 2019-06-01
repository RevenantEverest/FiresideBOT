const userSongsDB = require('../../models/UserModels/userSongsDB');
const youtubeServices = require('../../services/youtubeServices');
const YTDL = require('ytdl-core');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const requestFilter = ['http://', 'https://', '.com', 'watch?v=', 'youtube', 'www.youtube', 'youtu.be', '/'];

async function checkString(str, arr) {
  const re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
  return re.test(str);
};

async function filter(str, arr, options) {
  if(options.special) re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
  else re = new RegExp(`\\b(?:${arr.join("|")})\\b`, "gi");

  return str.replace(re, '').replace(/ +/g, " ").trim();
};
 
async function youtubeSearch(songData, songRequest, res, next) {
  youtubeServices.youtubeSearch(songRequest)
    .then(results => {
      if(results.data.items.length < 1) return res.json({ error: "No Results Found" });
      let link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
      YTDL_GetInfo(songData, link, res, next);
    })
    .catch(err => {
      if(err.response.status === 400) {
        res.json({ status: 400, error: 'Invalid Search Request' });
        next(err)
      }
    });
};

async function YTDL_GetInfo(songData, link, res, next) {
  YTDL.getInfo(link, (err, info) => {
    if(err) return res.json({ status: 500, error: "YTDL Get Info error."});
    if(info.title === undefined) return res.json({ status: 404, error: "YTDL_Error" })
    if(info.length_seconds >= 3600) return res.json({ status: 401, error: 'Requests limited to 1 hour'});
    checkForDuplicate({ 
      playlist_id: songData.playlist_id, title: info.title, link: link, author: info.author.name, duration: info.length_seconds, thumbnail_url: info.thumbnail_url 
    }, res, next);
  });
};

async function checkForDuplicate(songData, res, next) {
  userSongsDB.findByPlaylistId(songData.playlist_id)
  .then(songs => {
    let ID = songData.link.split("?v=")[1];
    let duplicate = songs.filter(el => el.link.split("?v=")[1] === ID);
    duplicate.length >= 1 ? res.json({ error: "Duplicate" }) : saveSong(songData, res, next);
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
        saveSong(songData, res, next);
    else next(err);
  });
}

async function saveSong(songData, res, next) {
  userSongsDB.save(songData)
  .then(song => res.json({ message: "Song Saved", data: song }))
  .catch(err => next(err));
};

module.exports = {
  index(req, res, next) {
    userSongsDB.findAll()
    .then(songs => res.json({ message: "Getting songs", data: songs }))
    .catch(err => next(err));
  },
  getByPlaylistId(req, res, next) {
    userSongsDB.findByPlaylistId(req.params.id)
    .then(songs => {
      if(songs.length < 1) return;
      res.json({ message: "Finding songs by playlist", data: songs })
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        res.json({ message: "No Songs Found", data: [] });
      else next(err);
    });
  },
  getOne(req, res, next) {
    userSongsDB.findOne(req.params.id)
    .then(song => res.json({ message: "Getting song", data: song }))
    .catch(err => next(err));
  },
  async addSong(req, res, next) {
    let songData = {};
    let request = '';
    songData.playlist_id = req.body.playlist_id;

    checkString(req.body.request, requestFilter) ? request = await filter(req.body.request, requestFilter, { special: false }) : request = req.body.request;
    youtubeSearch(songData, request, res, next);
  },
  delete(req, res, next) {
    userSongsDB.destroy(req.params.id)
    .then(() => res.json({ message: "Song Deleted" }))
    .catch(err => next(err));
  }
};
