const db = require('../../models/voteLogsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (callback, qrecCallback) => {
    db.findAll()
    .then(logs => callback(logs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else console.error(err);
    });
};

services.getOne = async (data, callback, qrecCallback) => {
    db.findById(data)
    .then(log => callback(log))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else console.error(err);
    });
};

services.getByDiscordId = async (data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(logs => callback(logs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else console.error(err);
    });
};

services.save = async (data, callback) => {
    db.save(data)
    .then(log => callback(log))
    .catch(err => console.error(err));
};

module.exports = services;