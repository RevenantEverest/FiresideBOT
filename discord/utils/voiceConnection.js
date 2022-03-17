const Discord_Bot = require('../Discord_Bot');
const playSong = require('../commands/utils/playSong');
const { timeParser } = require("./time");
const errorHandler = require('../controllers/errorHandler');
const services = {};

services.createConnection = (server, message) => {
    if(!server.queue.connection)
        message.member.voice.channel.join()
        .then(connection => playSong.playSong(Discord_Bot, connection, message, server, timeParser))
        .catch(err => errorHandler(Discord_Bot, message, err, "Join Voice Channel Error", "Play"));
    else if(server.queue.connection && !server.queue.isPlaying)
        return playSong.playSong(Discord_Bot, server.queue.connection, message, server, timeParser);
};

module.exports = services;