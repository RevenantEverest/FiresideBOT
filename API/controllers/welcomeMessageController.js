const db = require('../models/welcomeMessageDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(welcomeMessage => res.json({ message: "Getting Welcome Message", data: welcomeMessage }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Welcome Message Found", data: {} });
            else next(err);
        });
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(welcomeMessage => res.json({ message: "Getting Welcome Message", data: welcomeMessage }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Welcome Message Found", data: {} });
            else next(err);
        });
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(welcomeMessage => res.json({ message: "Getting Welcome Message", data: welcomeMessage }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Welcome Message Found", data: {} });
            else next(err);
        });
    },
    save(req, res, next) {
        db.save(req.body)
        .then(welcomeMessage => res.json({ message: "Welcome Message Saved", data: welcomeMessage }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(welcomeMessage => res.json({ message: "Welcome Message Updated", data: welcomeMessage }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.update(req.params.id)
        .then(() => res.json({ message: "Welcome Message Deleted" }))
        .catch(err => next(err));
    }
};