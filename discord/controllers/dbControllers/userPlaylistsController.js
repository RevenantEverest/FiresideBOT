const db = require('../../models/UserModels/userPlaylistsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Playlists", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findOne(data)
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Playlist By ID", command);
    })
};

services.getByDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Playlist By Discord ID", command);
    });
};

services.getByPlaylistName = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByPlaylistName(data)
    .then(playlist => callback(playlist))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Playlist By Name", command);
    });
};

services.getByDiscordIdAndPlaylistName = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordIdAndPlaylistName(data)
    .then(playlist => callback(playlist))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Playlist By Discord ID and Playlist Name", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(playlist => callback(playlist))
    .catch(err => errorHandler(bot, message, err, "Error Saving Playlist", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(playlist => callback(playlist))
    .catch(err => errorHandler(bot, message, err, "Error Updating Playlist", command));
};

services.deleteByNameAndDiscordId = async (bot, message, command, data, callback) => {
    db.deleteByNameAndDiscordId(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Playlist", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Playlist", command));
};

module.exports = services;