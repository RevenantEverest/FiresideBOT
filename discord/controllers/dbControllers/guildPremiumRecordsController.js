const db = require('../../models/GuildModels/guildPremiumRecordsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(records => callback(records))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Premium Records", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(record => callback(record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Premium Record", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(record => callback(record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Premium Record", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(record => callback(record))
    .catch(err => errorHandler(bot, message, err, "Error Saving Guild Premium Record", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(record => callback(record))
    .catch(err => errorHandler(bot, message, err, "Error Updating Guild Premium Record", command));
};

module.exports = services;