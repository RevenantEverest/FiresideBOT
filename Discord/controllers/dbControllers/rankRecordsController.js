const db = require('../../models/discordRankRecordsDB');
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
        else errorHandler(bot, message, err, "Error Finding Rank Records", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(record => callback(record))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Record", command);
    });
};

services.getByDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(records => callback(records))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Records", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(records => callback(records))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Records", command);
    });
};

services.getByDiscordIdAndGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordIdAndGuildId(data)
    .then(records => callback(records))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Records", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(record => callback(record))
    .catch(err => errorHandler(bot, message, err, "Error Saving Rank Record", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(record => callback(record))
    .catch(err => errorHandler(bot, message, err, "Error Updating Rank Record", command));
};

services.deleteByDiscordId = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Rank Record", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Rank Record", command));
};

module.exports = services;