const db = require('../models/streamerRolesDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.getByGuildId = async (guild, callback) => {
    db.findByGuildId(guild.id)
    .then(streamerRoles => callback(streamerRoles))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};

services.getByEnabled = async (callback) => {
    db.findByEnabled()
    .then(streamerRoles => callback(streamerRoles))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};

module.exports = services;