const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const volume = require('./volume');

module.exports = {
  playSong(connection, message) {
    let currentSongEmbed = new Discord.RichEmbed();
    let server = config.servers[message.guild.id];
    let request = server.queue.queueInfo[0];

    if(server.queue.isPaused === true) server.queue.isPaused = false;
    if(server.queue.isPlaying === false) server.queue.isPlaying = true;

    server.dispatcher = connection.playStream(YTDL(request.link, {filter: 'audioonly', quality: 'highestaudio'}));
    volume.setVolume(message, (['', server.volume]), server);

    let minutes = Math.floor(request.duration / 60);
    let seconds = Math.floor(request.duration - minutes * 60);

    if(!request) return;
    currentSongEmbed
      .setTitle('**CURRENT SONG**')
      .addField(request.title, request.author)
      .addField('Link', `[Click Me](${request.link}) \nRequested By: ${request.requestedBy}`)
      .setThumbnail(request.thumbnail)
      .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
      .setColor(0x0be289)
    message.channel.send(currentSongEmbed);

    server.queue.currentSongEmbed[0] = currentSongEmbed;
    server.queue.currentSongInfo = {
      title: server.queue.queueInfo[0].title,
      link: server.queue.queueInfo[0].link,
      requestedBy: server.queue.queueInfo[0].requestedBy}
    server.queue.queueInfo.shift();

    server.dispatcher.on("end", () => {
      if(server.queue.queueInfo[0] && message.guild.voiceConnection)
        this.playSong(connection, message);
      else {
        server.queue.queueInfo = [];
        server.queue.currentSongEmbed[0] = '';
        server.queue.currentSongInfo = {};
        connection.disconnect();
        server.queue.isPlaying = false;
        message.channel.send('Queue concluded.');
      }
    });
  }
}
