const db = require('../../models/commandLogsDB');
const { logUtils } = require('../../utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    getTopCommandsToday(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(async logs => {
            let logsToday = await logUtils.getLogsToday(logs);
            let parsedLogs = await logUtils.parseTopLogsToday(logsToday);
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
            let logsThisMonth = await logUtils.getLogsThisMonth(logs);
            let parsedLogs = await logUtils.parseTopLogsMonth(logsThisMonth);
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
            let logsOverThreeMonths = await logUtils.getLogsOverThreeMonths(logs);
            let parsedLogs = await logUtils.parseLogsOvertime(logsOverThreeMonths);
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
            let logsThisMonth = await logUtils.getLogsThisMonth(logs);
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
            let logsThisWeek = await logUtils.getLogsThisWeek(logs);
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
            let logsToday = await logUtils.getLogsToday(logs);
            res.json({ message: "Getting Logs Today By Guild", data: logsToday });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    }
};