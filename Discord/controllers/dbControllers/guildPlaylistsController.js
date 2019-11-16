const db = require('../../models/GuildModels/guildPlaylistsDB');
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
        else errorHandler(bot, message, err, "Error Finding Guild Playlists", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findOne(data)
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Playlist By ID", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Playlist By Guild ID", command);
    });
};  

services.getByPlaylistName = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByPlaylistName(data)
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Playlist By Playlist Name", command);
    });
};

services.getByGuildIdAndPlaylistName = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildIdAndPlaylistName(data)
    .then(playlists => callback(playlists))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild Playlist By Guild ID and Playlist Name", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(playlist => callback(playlist))
    .catch(err => errorHandler(bot, message, err, "Error Saving Guild Playlist", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(playlist => callback(playlist))
    .catch(err => errorHandler(bot, message, err, "Error Updating Guild Playlist", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Saving Guild Playlist", command));
};

module.exports = services;