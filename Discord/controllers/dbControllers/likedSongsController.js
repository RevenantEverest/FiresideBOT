const db = require('../../models/likedSongsDB');
const errorHandler = require('../errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(likedSongs => callback(likedSongs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Liked Songs", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(likedSong => callback(likedSong))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Liked Song", command);
    });
};

services.getByDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(likedSongs => callback(likedSongs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Liked Songs", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(likedSong => callback(likedSong))
    .catch(err => errorHandler(bot, message, err, "Error Saving Liked Song", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Liked Song", command));
};

module.exports = services;