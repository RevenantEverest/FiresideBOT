const userSongsDB = require('../../models/UserModels/userSongsDB');
const utils = require('../../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const requestFilter = ['http://', 'https://', '.com', 'watch?v=', 'youtube', 'www.youtube', 'youtu.be', '/'];

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
        let isLink = false;
        let request = '';

        if(await utils.checkString(req.body.request, requestFilter)) {
            request = await utils.filter(req.body.request, { special: false });
            isLink = true;
        }
        else request = req.body.request;

        utils.youtubeSearch(request, { isLink: isLink }, checkForDuplicate, () => {
            return res.status(500).send("Utils Error");
        });

        async function checkForDuplicate(songData) {
            userSongsDB.findByPlaylistId(req.body.playlist_id)
            .then(songs => {
                let ID = songData.link.split("?v=")[1];
                let duplicate = songs.filter(el => el.link.split("?v=")[1] === ID);
                duplicate.length >= 1 ? res.status(400).send("Duplicate Song") : saveSong(songData, res, next);
            })
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData)
                    saveSong(songData, res, next);
                else next(err);
            });
        }
        
        async function saveSong(songData) {
            songData.playlist_id = req.body.playlist_id;
            userSongsDB.save(songData)
            .then(song => res.json({ message: "Song Saved", data: song }))
            .catch(err => next(err));
        };
    },
    delete(req, res, next) {
        userSongsDB.destroy(req.params.id)
        .then(() => res.json({ message: "Song Deleted" }))
        .catch(err => next(err));
    }
};
