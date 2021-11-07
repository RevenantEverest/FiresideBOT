const playSong = require('./playSong');
const services = {};

services.createConnection = (server, message) => {
    if(!server.queue.connection)
        message.member.voice.channel.join()
        .then(connection => playSong.playSong(Discord_Bot, connection, message, server, this.timeParser))
        .catch(err => errorHandler(Discord_Bot, message, err, "Join Voice Channel Error", "Play"));
    else if(server.queue.connection && !server.queue.isPlaying)
        return playSong.playSong(Discord_Bot, server.queue.connection, message, server, this.timeParser);
};

module.exports = services;