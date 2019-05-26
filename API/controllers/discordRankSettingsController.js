const db = require('../models/discordRankSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(settings => res.json({ message: "Getting Settings", data: settings }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Settings Found", data: [{}] });
            else next(err);
        });
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(settings => res.json({ message: "Getting Settings", data: settings }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Settings Found", data: [{}] });
            else next(err);
        });
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(settings => res.json({ message: "Getting Settings", data: settings }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Settings Found", data: [{}] });
            else next(err);
        });
    },
    create(req, res, next) {
        db.save(req.body)
        .then(settings => res.json({ message: "Settings Saved", data: settings }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(settings => res.json({ message: "Settings Updated", data: settings }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Settings Deleted" }))
        .catch(err => next(err));
    }
};