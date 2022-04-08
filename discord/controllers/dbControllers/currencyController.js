const db = require('../../models/currencyDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.getCurrencySettings = async (bot, message, command, data, callback, qrecCallback) => {
    db.findCurrencySettings(data)
    .then(settings => callback(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Currency Settings", command);
    })
};

services.saveDefaultSettings = async (bot, message, command, data, callback) => {
    db.saveDefaultSettings(data)
    .then(settings => callback(settings))
    .catch(err => errorHandler(bot, message, err, "Error Saving Default Currency Settings", command));
};

services.updateSettings = async (bot, message, command, data, callback) => {
    db.updateCurrencySettings(data)
    .then(settings => callback(settings))
    .catch(err => errorHandler(bot, message, err, "Error Updating Currency Settings", command));
};

module.exports = services;