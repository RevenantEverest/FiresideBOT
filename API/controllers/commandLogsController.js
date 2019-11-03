const db = require('../models/commandLogsDB');
const bot = require('../Discord_Bot');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];

async function getDate() {
    const today = new Date();
    const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
    return date;
}

async function getLogsThisMonth(logs) {
    let date = await getDate();
    return logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month]);
};

async function getLogsToday(logs) {
    let date = await getDate();
    let logsThisMonth = await getLogsThisMonth(logs);
    return logsThisMonth.filter(el => el.date.trim().split(",")[1].split(" ")[2] === `${date.day}`);
};

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(logs => res.json({ message: "Getting Logs", data: logs }))
        .catch(err => next(err));
    },
    getByCommand(req, res, next) {
        db.findByCommand(req.params.command)
        .then(logs => res.json({ message: "Getting Logs by Command", data: logs }))
        .catch(err => next(err));
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(logs => res.json({ message: "Getting Logs by Guild ID", data: logs }))
        .catch(err => next(err))
    },
    getTopGuildsToday(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsToday = await getLogsToday(logs);
            let temp = [];

            logsToday.forEach(el => {
                if(temp.map(log => log.guild_id).includes(el.guild_id)) return;
                let data = {
                    guild_id: el.guild_id,
                    guild_name: (bot.guilds.get(el.guild_id) ? bot.guilds.get(el.guild_id).name : "Guild Removed"),
                    commandUses: logsToday.filter(log => log.guild_id === el.guild_id).length,
                    info: logsToday.filter(log => log.guild_id === el.guild_id)
                }
                temp.push(data);
                temp = temp.sort((a, b) => b.commandUses - a.commandUses);
            });

            logsToday = temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);

            res.json({ message: "Getting Logs Today", data: logsToday });
        })
        .catch(err => next(err));
    },
    getTopGuildsMonth(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsThisMonth = await getLogsThisMonth(logs);
            let temp = [];
            logsThisMonth.forEach((el, idx) => {
                if(temp.map(log => log.guild_id).includes(el.guild_id)) return;
                let data = {
                    guild_id: el.guild_id,
                    guild_name: (bot.guilds.get(el.guild_id) ? bot.guilds.get(el.guild_id).name : "Guild Removed"),
                    commandUses: logsThisMonth.filter(log => log.guild_id === el.guild_id).length,
                    info: logsThisMonth.filter(log => log.guild_id === el.guild_id)
                }
                temp.push(data);
                temp = temp.sort((a, b) => b.commandUses - a.commandUses);
            });

            logsThisMonth = temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
            res.json({ message: "Getting Logs Today", data: logsThisMonth });
        })
        .catch(err => next(err));
    },
    getTopCommandsToday(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsToday = await getLogsToday(logs);
            let temp = [];
            logsToday.forEach(el => {
                if(temp.map(log => log.command).includes(el.command)) return;
                let data = {
                    command: el.command,
                    amount: logsToday.filter(log => log.command === el.command).length,
                    info: logsToday.filter(log => log.command === el.command)
                }
                temp.push(data);
                temp = temp.sort((a, b) => b.amount - a.amount);
            });

            logsToday = temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
            res.json({ message: "Getting Logs Today", data: logsToday });
        })
        .catch(err => next(err));
    },
    getTopCommandsMonth(req, res, next) {
        db.findAll()
        .then(async logs => {
            let logsThisMonth = await getLogsThisMonth(logs);
            let temp = [];
            logsThisMonth.forEach(el => {
                if(temp.map(log => log.command).includes(el.command)) return;
                let data = {
                    command: el.command,
                    amount: logsThisMonth.filter(log => log.command === el.command).length,
                    info: logsThisMonth.filter(log => log.command === el.command)
                }
                temp.push(data);
                temp = temp.sort((a, b) => b.amount - a.amount);
            });

            logsThisMonth = temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
            res.json({ message: "Getting Logs Today", data: logsThisMonth });
        })
        .catch(err => next(err));
    },
};