const db = require('../../models/newMemberMessagesDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(memberMessages => callback(memberMessages))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding New Member Messages", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(memberMessage => callback(memberMessage))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding New Member Message", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(memberMessages => callback(memberMessages))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding New Member Messages", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(memberMessages => callback(memberMessages))
    .catch(err => errorHandler(bot, message, err, "Error Saving New Member Messages", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(memberMessages => callback(memberMessages))
    .catch(err => errorHandler(bot, message, err, "Error Updating New Member Messages", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting New Member Messages", command))
};

module.exports = services;