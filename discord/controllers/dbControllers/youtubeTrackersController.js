const db = require('../../models/youtubeTrackersDB');
const errorHandler = require('../errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(trackers => callback(trackers))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding YouTube Trackers", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(tracker => callback(tracker))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding YouTube Tracker", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(trackers => callback(trackers))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding YouTube Trackers", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(tracker => callback(tracker))
    .catch(err => errorHandler(bot, message, err, "Error Saving YouTube Tracker", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(tracker => callback(tracker))
    .catch(err => errorHandler(bot, message, err, "Error Updating YouTube Tracker", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(tracker => callback(tracker))
    .catch(err => errorHandler(bot, message, err, "Error Deleting YouTube Tracker", command));
};

module.exports = services;