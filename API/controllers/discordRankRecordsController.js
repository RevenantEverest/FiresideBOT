const db = require('../models/discordRankRecordsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(records => res.json({ message: "Getting All Discord Rank Records", data: records }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Records Found", data: [{}] });
            else next(err);
        })
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(record => res.json({ message: "Getting Discord Rank Record", data: record }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Records Found", data: [{}] });
            else next(err);
        })
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(records => res.json({ message: "Getting All Discord Rank Records", data: records }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Records Found", data: [{}] });
            else next(err);
        })
    },
    getByDiscordId(req, res, next) {
        db.findByDiscordId(req.params.id)
        .then(record => res.json({ message: "Getting Discord Rank Record", data: record }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Records Found", data: [{}] });
            else next(err);
        })
    },
    create(req, res, next) {
        db.save(req.body)
        .then(record => res.json({ message: "Record Saved", data: record }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(record => res.json({ message: "Record Updated", data: record }))
        .catch(err => next(err));
    },
    deleteByDiscordId(req, res, next) {
        db.deleteByDiscordId(req.params.id)
        .then(() => res.json({ message: "Record Deleted" }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Record Deleted" }))
        .catch(err => next(err));
    }
};