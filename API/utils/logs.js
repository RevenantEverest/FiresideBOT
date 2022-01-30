const moment = require('moment');
const bot = require('../Discord_Bot');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
const services = {};

async function getDate() {
    const today = new Date();
    const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
    return date;
};

services.getLogsOverThreeMonths = async (logs) => {
    let date = await getDate();
    let temp = [];
    for(let i = 1; i < 4; i++) {
        if(date.month - i === 0)
            temp.push(logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[0]));
        else if(date.month - i < 0)
            temp.push(logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[12 + date.month - i]));
        else 
            temp.push(logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month - i]));
    }
    return temp;
};

services.getLogsThisMonth = async (logs) => {
    let date = await getDate();
    return logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month]);
};

services.getLogsThisWeek = async (logs) => {
    let date = await getDate();
    console.log("Logs This Week Date => ", date, logs.length, date.month)
    let logsThisMonth = logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month]);
    let logsLastMonth = logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month - 1 <= 0 ? (date.month - 1 < 0 ? 12 + date.month - 1 : 0) : date.month - 1]);
    let logsOverTwoMonths = [].concat.apply(logsThisMonth, logsLastMonth);
    logsOverTwoMonths = logsOverTwoMonths.map(el => {
        let logDate = `${months.indexOf(el.date.split(",")[1].split(" ")[1]) + 1}-${el.date.split(",")[1].split(" ")[2]}-${months.indexOf(el.date.split(",")[1].split(" ")[1]) < 0 ? 2019 : 2020}`;
        return {
            id: el.id,
            command: el.command,
            args: el.args,
            discord_id: el.discord_id,
            guild_id: el.guild_id,
            date: moment(logDate, "MM-DD-YYYY")
        }
    });

    let temp = [];
    let lastLogDate = moment(logsOverTwoMonths[0].date);
    for(let i = 0; i < 8; i++) {
        temp.push(logsOverTwoMonths.filter(el => moment(el.date).format("DD-MM") === moment(lastLogDate).subtract(i, "days").format("DD-MM")));
    }
    return [].concat.apply([], temp);
};

services.getLogsToday = async (logs) => {
    let date = await getDate();
    let logsThisMonth = logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month]);
    return logsThisMonth.filter(el => el.date.trim().split(",")[1].split(" ")[2] === `${date.day}`);
};

services.parseTopLogsToday = async (logsToday) => {
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

    return temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
};

services.parseTopLogsMonth = async (logsThisMonth) => {
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

    return temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
};

services.parseLogsOvertime = async (logsOverThreeMonths) => {
    let temp = [];
    let date = await getDate();
    logsOverThreeMonths.forEach((el, idx) => {
        let month = null;
        if(date.month - (idx + 1) === 0) month = months[0];
        else if(date.month - (idx + 1) < 0) month = months[12 + date.month - (idx + 1)];
        else month = months[date.month - (idx + 1)];
        let data = {
            month: month,
            commandUses: logsOverThreeMonths[idx].length,
            info: el
        };
        temp.push(data);
    });
    return temp.reverse();
};

services.parseTopGuildsToday = async (logsToday) => {
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

    return temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
};

services.parseTopGuildMonth = async (logsThisMonth) => {
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

    return temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);
};

module.exports = services;