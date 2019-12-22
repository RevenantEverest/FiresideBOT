const db = require('../models/workingChangelogsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(changelogs => res.json({ message: "Getting Working Changelogs", data: changelogs }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Working Changelogs Found", data: [] });
            else next(err);
        });
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(changelog => res.json({ message: "Getting Working Changelog", data: changelog }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Working Changelogs Found", data: [] });
            else next(err);
        });
    },
    save(req, res, next) {
        db.save(req.body)
        .then(changelog => res.json({ message: "Saving Working Changelog", data: changelog }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(changelog => res.json({ message: "Updating Working Changelogs", data: changelog }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Deleted Working Changelogs" }))
        .catch(err => next(err));
    }
};