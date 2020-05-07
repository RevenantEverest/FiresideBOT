const db = require('../../models/apiTokensDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.getByService = (data, callback, qrecCallback) => {
    db.findByService(data)
    .then(token => callback(token))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            qrecCallback();
        else console.error(err);
    });
};

services.save = (data, callback) => {
    db.save(data)
    .then(token => callback(token))
    .catch(err => console.error(err));
};

services.update = (data, callback) => {
    db.update(data)
    .then(token => callback(token))
    .catch(err => console.error(err));
};

module.exports = services;