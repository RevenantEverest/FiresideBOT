const db = require('../../models/roleReactionsDB');
const errorHandler = require('../errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(roleReactions => callback(roleReactions))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Role Reactions", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Role Reaction", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(roleReactions => callback(roleReactions))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Role Reactions", command);
    });
};

services.getByGuildIdAndMessageId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildIdAndMessageId(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Role Reaction", command);
    });
};

services.getByGuildIdAndRoleId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildIdAndRoleId(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Role Reaction", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => errorHandler(bot, message, err, "Error Saving Role Reaction", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => errorHandler(bot, message, err, "Error Updating Role Reaction", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Role Reaction", command));
};

module.exports = services;