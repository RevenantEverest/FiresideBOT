const db = require('../../models/streamerRolesDB');
const errorHandler = require('../errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(streamerRoles => callback(streamerRoles))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Streamer Roles", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(streamerRole => callback(streamerRole))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Streamer Role", command);
    });
}; 

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(streamerRole => callback(streamerRole))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Streamer Role", command);
    });
}; 

services.save = async (bot, message, command, data, callback, qrecCallback) => {
    db.save(data)
    .then(streamerRole => callback(streamerRole))
    .catch(err => errorHandler(bot, message, err, "Error Saving Streamer Role", command));
};  

services.update = async (bot, message, command, data, callback, qrecCallback) => {
    db.update(data)
    .then(streamerRole => callback(streamerRole))
    .catch(err => errorHandler(bot, message, err, "Error Updating Streamer Role", command));
};  

services.delete = async (bot, message, command, data, callback, qrecCallback) => {
    db.delete(data)
    .then(streamerRole => callback(streamerRole))
    .catch(err => errorHandler(bot, message, err, "Error Deleting Streamer Role", command));
};  

module.exports = services;