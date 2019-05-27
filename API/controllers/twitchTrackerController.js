const db = require('../models/twitchTrackerDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(trackers => res.json({ message: "Getting Trackers", data: trackers }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                res.json({ message: "No Trackers Found", data: [{}] });
            else next(err);
        })
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(tracker => res.json({ message: "Getting Tracker", data: tracker }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                res.json({ message: "No Tracker Found", data: {} });
            else next(err);
        })
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(trackers => res.json({ message: "Getting Trackers by Guild Id", data: trackers }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                res.json({ message: "No Trackers Found", data: [{}] });
            else next(err);
        })
    },
    create(req, res, next) {
        db.save(req.body)
        .then(tracker => res.json({ message: "Saving Tracker", data: tracker }))
        .catch(err => next(err))
    },
    update(req, res, next) {
        db.update(req.body)
        .then(tracker => res.json({ message: "Updating Tracker", data: tracker }))
        .catch(err => next(err))
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Tracker Deleted" }))
        .catch(err => next(err));
    }
};