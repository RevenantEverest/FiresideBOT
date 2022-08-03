const logSettingsDB = require('../models/guildLogSettingsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('./errorHandler');

services.getLogSettings = async (guild_id, callback) => {
    logSettingsDB.findByGuildId(guild_id)
    .then(settings => callback(settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "Guild Log Settings Controller", message: "Error Finding Guild Log Settings", error: err });
    })
};

module.exports = services;