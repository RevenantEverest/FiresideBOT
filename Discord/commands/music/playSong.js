const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const volume = require('./volume');

module.exports = {
  playSong(connection, message) {
    let currentSongEmbed = new Discord.RichEmbed();
    let server = config.servers[message.guild.id];
    let embedLink = server.queue.queueInfo[0].link;

    if(server.queue.isPlaying === false) server.queue.isPlaying = true;
    server.dispatcher = connection.playStream(YTDL(server.queue.queueInfo[0].link, {filter: 'audioonly', quality: 'highestaudio'}));
    volume.setVolume(message, (['', server.volume]), server);
    YTDL.getInfo(embedLink.toString(), (err, info) => {
      if(err) return message.channel.send("YTDL Get Info error.");
      if(info.title === undefined) {
        message.channel.send(`Can't read title of undefined`)
      }else {
        let minutes = Math.floor(info.length_seconds / 60);
        let seconds = Math.floor(info.length_seconds - minutes * 60);

        if(!server.queue.queueInfo[0]) return;
        currentSongEmbed
          .setTitle('**CURRENT SONG**')
          .addField(info.title, info.author.name)
          .addField('Link', `[Click Me](${embedLink}) \nRequested By: ${server.queue.queueInfo[0].requestedBy}`)
          .setThumbnail(info.thumbnail_url)
          .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
          .setColor(0x0be289)
        message.channel.send(currentSongEmbed);

        server.queue.currentSongEmbed[0] = currentSongEmbed;
        server.queue.currentSongInfo = {
          title: server.queue.queueInfo[0].title,
          link: server.queue.queueInfo[0].link,
          requestedBy: server.queue.queueInfo[0].requestedBy}
        server.queue.queueInfo.shift();
      }
    });

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
