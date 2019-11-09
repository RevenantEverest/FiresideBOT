const db = require('../../models/GuildModels/guildSongsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(songs => callback(songs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Songs", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findOne(data)
    .then(song => callback(song))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Song", command);
    });
};

services.getByPlaylistId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByPlaylistId(data)
    .then(songs => callback(songs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Songs", command);
    });
};

services.getByPlaylistAndSongBySongId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findPlaylistAndSongBySongId(data)
    .then(songs => callback(songs))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Songs", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(song => callback(song))
    .catch(err => errorHandler(bot, message, err, "Error Deleteing Songs", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.destroy(data)
    .then(song => callback(song))
    .catch(err => errorHandler(bot, message, err, "Error Deleteing Songs", command));
};

services.deletePlaylistSongs = async (bot, message, command, data, callback) => {
    db.deletePlaylistSongs(data)
    .then(song => callback(song))
    .catch(err => errorHandler(bot, message, err, "Error Deleteing Songs", command));
};

module.exports = services;