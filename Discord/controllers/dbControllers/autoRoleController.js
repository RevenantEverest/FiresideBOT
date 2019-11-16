const db = require('../../models/autoRoleDB');
const errorHandler = require('../errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(autoRole => callback(autoRole))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Auto Role", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(autoRole => callback(autoRole))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Auto Role", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(autoRole => callback(autoRole))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Auto Role", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(autoRole => callback(autoRole))
    .catch(err => errorHandler(bot, message, err, "Error Saving Auto Role", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(autoRole => callback(autoRole))
    .catch(err => errorHandler(bot, message, err, "Error Updating Auto Role", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Auto Role", command));
};

module.exports = services;