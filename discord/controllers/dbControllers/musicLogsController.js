const db = require('../../models/musicLogsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(logs => callback(logs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Logs", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(log => callback(log))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Log", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(logs => callback(logs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Logs", command);
    });
};

services.getDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(logs => callback(logs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Logs", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(log => callback(log))
    .catch(err => errorHandler(bot, message, err, "Error Saving Log", command));
};

module.exports = services;