const db = require('../../models/GuildModels/guildSettingsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(settings => callback(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Settings", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(settings => callback(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Settings", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(settings => callback(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Settings", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(settings => callback(settings))
    .catch(err => errorHandler(bot, message, err, "Error Saving Settings", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(settings => callback(settings))
    .catch(err => errorHandler(bot, message, err, "Error Updating Settings", command));
};

module.exports = services;