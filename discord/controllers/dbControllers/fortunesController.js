const db = require('../../models/discordFortunesDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(fortunes => callback(fortunes))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Fortunes", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(fortunes => callback(fortunes))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Fortunes", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(fortunes => callback(fortunes))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Fortunes", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(fortunes => callback(fortunes))
    .catch(err => errorHandler(bot, message, err, "Error Saving Fortunes", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(fortunes => callback(fortunes))
    .catch(err => errorHandler(bot, message, err, "Error Updating Fortunes", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Fortunes", command));
};

module.exports = services;