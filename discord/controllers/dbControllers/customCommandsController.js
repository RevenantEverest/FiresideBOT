const db = require('../../models/customCommandsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(commands => callback(commands))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Custom Commands", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(command => callback(command))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Custom Command", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(commands => callback(commands))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Custom Commands", command);
    });
};

services.getByGuildIdAndInput = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildIdAndInput(data)
    .then(commands => callback(commands))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Custom Commands", command);
    });
};

services.getByDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(commands => callback(commands))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Custom Commands", command);
    });
};

services.getByDiscordIdAndGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordIdAndGuildId(data)
    .then(commands => callback(commands))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Custom Commands", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(command => callback(command))
    .catch(err => errorHandler(bot, message, err, "Error Saving Custom Command", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(command => callback(command))
    .catch(err => errorHandler(bot, message, err, "Error Updating Custom Command", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(command => callback(command))
    .catch(err => errorHandler(bot, message, err, "Error Deleting Custom Command", command));
};

module.exports = services;