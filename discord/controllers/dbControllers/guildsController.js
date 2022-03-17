const db = require('../../models/GuildModels/guildsDB');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback) => {
    db.findAll()
    .then(guilds => callback(guilds))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guilds", command);
    });
};

services.findById = async (bot, message, command, data, callback) => {
    db.findById(data)
    .then(guilds => callback(guilds))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Guild", command);
    });
};

services.save = async (bot, message, command, data, callback) => {
    db.save(data)
    .then(guild => callback(guild))
    .catch(err => errorHandler(bot, message, err, "Error Saving Guild", command));
};

services.update = async (bot, message, command, data, callback) => {
    db.update(data)
    .then(guild => callback(guild))
    .catch(err => errorHandler(bot, message, err, "Error Updating Guild", command));
};

services.delete = async (bot, message, command, data, callback) => {
    db.destroy(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Guild", command));
};

module.exports = services;