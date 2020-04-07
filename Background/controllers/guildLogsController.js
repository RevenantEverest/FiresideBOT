const db = require('../models/guildLogsDB');
const moment = require('moment');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('./errorHandler');

services.getByGuildId = async (guild, callback) => {
    db.getByGuildId(guild.id)
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            services.save(guild, callback);
        else errorHandler({ controller: "Guild Logs Controller", message: "Error Finding Guild Logs", error: err });
    });
};

services.save = async (guild, callback) => {
    db.save({ guild_id: guild.id, date: moment() })
    .then(() => callback())
    .catch(err => errorHandler({ controller: "Guild Logs Controller", message: "Error Saving Guild Logs", error: err }));
};

module.exports = services;