const axios = require('axios');
const services = {};
const options = {timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'};

services.commandLogger = (data) => {
    let date = new Date();
    let currentDate = date.toLocaleString('en-US', options);
    return axios({
        method: 'POST',
        url: 'http://localhost:3002/command',
        data: { command: data.command, args: data.args, message: data.message, discord_id: data.discord_id, guild_id: data.guild_id, date: currentDate }
    });
};

services.commandErrorLogger = (data) => {
    let date = new Date();
    let currentDate = date.toLocaleString('en-US', options);
    return axios({
        method: "POST",
        url: "http://localhost:3002/error/command",
        data: {
            command: data.command,
            args: data.command,
            guild_id: data.guild_id,
            discord_id: data.discord_id,
            error_message: data.error_message,
            error: data.error,
            date: currentDate
        }
    });
};

module.exports = services;
