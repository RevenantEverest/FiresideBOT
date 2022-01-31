const db = require('../../models/voteRecordsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (callback, qrecCallback) => {
    db.findAll()
    .then(records => callback(records))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else console.error(err);
    });
};

services.getOne = async (data, callback, qrecCallback) => {
    db.findById(data)
    .then(record => callback(record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else console.error(err);
    });
};

services.getByDiscordId = async (data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(records => callback(records))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else console.error(err);
    });
};

services.save = async (data, callback) => {
    db.save(data)
    .then(record => callback(record))
    .catch(err => console.error(err));
};

services.update = async (data, callback) => {
    db.update(data)
    .then(record => callback(record))
    .catch(err => console.error(err));
};

services.delete = async (data, callback) => {
    db.delete(data)
    .then(record => callback(record))
    .catch(err => console.error(err));
};

module.exports = services;