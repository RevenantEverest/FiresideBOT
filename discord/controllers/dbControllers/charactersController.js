const db = require('../../models/AcirhiaModels/characterModels');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(character => callback(character))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(character => callback(character))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character", command);
    });
};

services.getByDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(character => callback(character))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character", command);
    });
};

services.getFullCharacter = async (bot, message, command, data, callback, qrecCallback) => {
    db.findFullCharacterByDiscordId(data)
    .then(character => callback(character))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character", command);
    });
};

services.save = async (bot, message, command, data, callback, qrecCallback) => {
    db.save(data)
    .then(character => callback(character))
    .catch(err => errorHandler(bot, message, err, "Error Saving Character", command));
};

services.update = async (bot, message, command, data, callback, qrecCallback) => {
    db.update(data)
    .then(character => callback(character))
    .catch(err => errorHandler(bot, message, err, "Error Updating Character", command));
};

services.delete = async (bot, message, command, data, callback, qrecCallback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Character", command));
};

module.exports = services;