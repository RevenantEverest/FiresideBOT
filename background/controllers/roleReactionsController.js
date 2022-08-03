const db = require('../models/roleReactionsDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('./errorHandler');

services.index = async (callback) => {
    db.findAll()
    .then(roleReactions => callback(roleReactions))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "Role Reactions Controller", message: "Error Finding Role Reactions", error: err });
    });
};

services.getOne = async (data, callback) => {
    db.findById(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "Role Reactions Controller", message: "Error Finding Role Reaction", error: err });
    });
};

services.getByGuildId = async (data, callback) => {
    db.findByGuildId(data)
    .then(roleReactions => callback(roleReactions))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "Role Reactions Controller", message: "Error Finding Role Reactions", error: err });
    });
};

services.getByGuildIdAndMessageId = async (data, callback) => {
    db.findByGuildIdAndMessageId(data)
    .then(roleReactions => callback(roleReactions))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "Role Reactions Controller", message: "Error Finding Role Reaction", error: err });
    });
};

services.getByGuildIdAndRoleId = async (data, callback) => {
    db.findByGuildIdAndRoleId(data, callback)
    .then(roleReactions => callback(roleReactions))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "Role Reactions Controller", message: "Error Finding Role Reactions", error: err });
    });
};

services.getByGuildIdAndMessageIdAndRoleId = async (data, callback, qrecCallback) => {
    db.findByGuildIdAndMessageIdAndRoleId(data)
    .then(roleReaction => callback(roleReaction))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return qrecCallback();
        else errorHandler({ controller: "Role Reactions Controller", message: "Error Finding Role Reaction", error: err });
    });
};

services.delete = async (data, message) => {
    db.delete(data)
    .then(() => handleDeletedRoleReaction(message))
    .catch(err => errorHandler({ controller: "Role Reactions Controller", message: "Error Deleting Role Reactions", error: err }))
};

async function handleDeletedRoleReaction(message) {
    /*
    
        Send Embed to server owner/ admin explaining a role reaction has been deleted due to the message being deleted

        Who deleted the message
        The Role that was in the reaction

    */
};

module.exports = services;