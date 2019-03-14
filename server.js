require('dotenv').config();

const Discord_Bot = require('./Discord/Discord_Bot');
const Twitch_Bot = require('./Twitch/Twitch_Bot');

// Twitch_Bot.connect();
Discord_Bot.login(process.env.DISCORD_KEY);

module.exports = require('./app');
