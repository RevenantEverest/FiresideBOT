const db = require('../../models/commandLogsDB');
const utils = require('../../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    getTopCommandsToday(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs => {
            let logsToday = await utils.getLogsToday(logs);
            let parsedLogs = await utils.parseTopLogsToday(logsToday);
            res.json({ message: "Getting Logs Today By Guild", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        })
    },
    getTopCommandsThisMonth(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs =>  {
            let logsThisMonth = await utils.getLogsThisMonth(logs);
            let parsedLogs = await utils.parseTopLogsMonth(logsThisMonth);
            res.json({ message: "Getting Logs This Month By Guild", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsOvertime(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs => {
            let logsOverThreeMonths = await utils.getLogsOverThreeMonths(logs);
            let parsedLogs = await utils.parseLogsOvertime(logsOverThreeMonths);
            res.json({ message: "Getting Logs Overtime By Guild", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsThisMonth(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs => {
            let logsThisMonth = await utils.getLogsThisMonth(logs);
            res.json({ message: "Getting Logs This Month By Guild", data: logsThisMonth });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsThisWeek(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs => {
            let logsThisWeek = await utils.getLogsThisWeek(logs);
            res.json({ message: "Getting Logs Today By Guild", data: logsThisWeek });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsToday(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs => {
            let logsToday = await utils.getLogsToday(logs);
            res.json({ message: "Getting Logs Today By Guild", data: logsToday });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    }
};