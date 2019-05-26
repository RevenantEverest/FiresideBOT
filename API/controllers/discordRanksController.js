const db = require('../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(ranks => res.json({ message: "Getting All Ranks", data: ranks }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Ranks Found", data: [{}] });
            else next(err);
        })
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(rank => res.json({ message: "Getting Rank", data: rank }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Ranks Found", data: {} });
            else next(err);
        })
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(ranks => res.json({ message: "Getting Ranks", data: ranks }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Ranks Found", data: [{}] });
            else next(err);
        })
    },
    create(req, res, next) {
        db.save(req.body)
        .then(rank => res.json({ message: "Rank Saved", data: rank }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(rank => res.json({ message: "Rank Updated", data: rank }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Rank Deleted" }))
        .catch(err => next(err));
    }
};