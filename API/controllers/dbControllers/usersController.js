const db = require('../../models/UserModels/usersDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.getById = (data, callback, qrecCallback) => {
    db.findById(data)
    .then(user => callback(user))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            qrecCallback();
        else console.error(err);
    });
};

services.getByDiscordId = (data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(user => callback(user))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            qrecCallback();
        else console.error(err);
    });
};

services.save = (data, callback) => {
    db.save(data)
    .then(user => callback(user))
    .catch(err => console.error(err));
};

module.exports = services;