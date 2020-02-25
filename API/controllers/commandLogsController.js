const db = require('../models/commandLogsDB');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(logs => res.json({ message: "Getting Logs", data: logs }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getByCommand(req, res, next) {
        db.findByCommand(req.params.command)
        .then(logs => res.json({ message: "Getting Logs by Command", data: logs }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(logs => res.json({ message: "Getting Logs by Guild ID", data: logs }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        })
    },
    getTopGuildsToday(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsToday = await utils.getLogsToday(logs);
            let parsedLogs = await utils.parseTopGuildsToday(logsToday);
            res.json({ message: "Getting Logs Today", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getTopCommandsTodayByGuild(req, res, next) {
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
    getTopCommandsMonthByGuild(req, res, next) {
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
    getCommandsOverTimeByGuild(req, res, next) {
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
    getCommandsMonthByGuild(req, res, next) {
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
    getCommandsWeekByGuild(req, res, next) {
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
    getCommandsTodayByGuild(req, res, next) {
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
    },
    getTopGuildsMonth(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsThisMonth = await utils.getLogsThisMonth(logs);
            let parsedLogs = await utils.parseTopGuildMonth(logsThisMonth);
            res.json({ message: "Getting Logs Today", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getTopCommandsToday(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsToday = await utils.getLogsToday(logs);
            let parsedLogs = await utils.parseTopLogsToday(logsToday);
            res.json({ message: "Getting Logs Today", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getTopCommandsMonth(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsThisMonth = await utils.getLogsThisMonth(logs);
            let parsedLogs = await utils.parseTopLogsMonth(logsThisMonth);
            res.json({ message: "Getting Logs Today", data: parsedLogs });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsOverTime(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsOverThreeMonths = await utils.getLogsOverThreeMonths(logs);
            let parsedLogs = await utils.parseLogsOvertime(logsOverThreeMonths);
            res.json({ message: "Getting Logs Overtime", data: parsedLogs });
        })
        .catch(err => next(err));
    },
    getCommandsMonth(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsThisMonth = await utils.getLogsThisMonth(logs);
            res.json({ message: "Getting Logs This Month", data: logsThisMonth });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsWeek(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsThisWeek = await utils.getLogsThisWeek(logs);
            res.json({ message: "Getting Logs Today", data: logsThisWeek });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
    getCommandsToday(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsToday = await utils.getLogsToday(logs);
            res.json({ message: "Getting Logs Today", data: logsToday });
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Data Found", data: [] });
            else next(err);
        });
    },
};