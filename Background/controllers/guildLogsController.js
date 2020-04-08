const db = require('../models/guildLogsDB');
const moment = require('moment');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('./errorHandler');

services.getByGuildId = async (guild, callback, guildCreate) => {
    db.findByGuildId(guild.id)
    .then(guildLog => {
        if(guildCreate) return callback(guildLog);
        else return;
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            services.save(guild, callback);
        else errorHandler({ controller: "Guild Logs Controller", message: "Error Finding Guild Logs", error: err });
    });
};

services.save = async (guild, callback) => {
    db.save({ guild_id: guild.id, join_date: moment() })
    .then(guildLog => {
        if(callback) return callback(guildLog);
        else return;
    })
    .catch(err => errorHandler({ controller: "Guild Logs Controller", message: "Error Saving Guild Logs", error: err }));
};

services.update = async (guild, rejoin) => {
    db.update({ guild_id: guild.id, removal_date: rejoin ? null : moment() })
    .catch(err => errorHandler({ controller: "Guild Logs Controller", message: "Error Updating Guild Logs", error: err }));
};

module.exports = services;