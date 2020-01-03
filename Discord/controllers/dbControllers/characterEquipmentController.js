const db = require('../../models/AcirhiaModels/characterEquipmentModels');
const errorHandler = require('../../controllers/errorHandler');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.index = async (bot, message, command, callback, qrecCallback) => {
    db.findAll()
    .then(equipment => callback(equipment))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character Equipment", command);
    });
};

services.getOne = async (bot, message, command, data, callback, qrecCallback) => {
    db.findById(data)
    .then(equipment => callback(equipment))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character Equipment", command);
    });
};

services.getByDiscordId = async (bot, message, command, data, callback, qrecCallback) => {
    db.findByDiscordId(data)
    .then(equipment => callback(equipment))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler(bot, message, err, "Error Finding Character Equipment", command);
    });
};

services.save = async (bot, message, command, data, callback, qrecCallback) => {
    db.save(data)
    .then(equipment => callback(equipment))
    .catch(err => errorHandler(bot, message, err, "Error Saving Character Equipment", command));
};

services.update = async (bot, message, command, data, callback, qrecCallback) => {
    db.update(data)
    .then(equipment => callback(equipment))
    .catch(err => errorHandler(bot, message, err, "Error Updating Character Equipment", command));
};

services.delete = async (bot, message, command, data, callback, qrecCallback) => {
    db.delete(data)
    .then(() => callback())
    .catch(err => errorHandler(bot, message, err, "Error Deleting Character Equipment", command));
};

module.exports = services;