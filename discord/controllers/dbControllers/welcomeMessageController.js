const db = require('../../models/welcomeMessageDB');
const errorHandler = require('../errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(welcomeMessage => callback(welcomeMessage))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Welcome Message", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(welcomeMessage => callback(welcomeMessage))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Welcome Message", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(welcomeMessage => callback(welcomeMessage))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Welcome Message", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(welcomeMessage => callback(welcomeMessage))
    .catch(err => errorHandler(bot, message, err, "Error Saving Welcome Message", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(welcomeMessage => callback(welcomeMessage))
    .catch(err => errorHandler(bot, message, err, "Error Updating Welcome Message", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Welcome Message", command));
};

module.exports = services;