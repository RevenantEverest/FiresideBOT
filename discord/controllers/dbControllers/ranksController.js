const db = require('../../models/discordRanksDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(ranks => callback(ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Tiers", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(rank => callback(rank))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Tiers", command);
    });
};

services.getByGuildId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByGuildId(data)
    .then(ranks => callback(ranks))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Rank Tiers", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(rank => callback(rank))
    .catch(err => errorHandler(bot, message, err, "Error Saving Rank Tier", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(rank => callback(rank))
    .catch(err => errorHandler(bot, message, err, "Error Updating Rank Tier", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Rank Tier", command));
};

module.exports = services;