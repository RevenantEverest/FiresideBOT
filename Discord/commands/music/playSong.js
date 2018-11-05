const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const volume = require('./volume');

module.exports = {
  playSong(connection, message) {
    let currentSongEmbed = new Discord.RichEmbed();
    let server = config.servers[message.guild.id];
    let embedLink = server.queue.links[0];

    if(server.queue.isPlaying === false) server.queue.isPlaying = true;
    server.dispatcher = connection.playStream(YTDL(server.queue.links[0], {filter: 'audioonly', quality: 'highestaudio'}));
    volume.setVolume(message, (['', server.volume]), server);
    YTDL.getInfo(embedLink.toString(), (err, info) => {
      if(err) return message.channel.send("YTDL Get Info error.");
      if(info.title === undefined) {
        message.channel.send(`Can't read title of undefined`)
      }else {
        let minutes = Math.floor(info.length_seconds / 60);
        let seconds = Math.floor(info.length_seconds - minutes * 60);

        console.log(server.queue);
        currentSongEmbed
          .addField(info.title, info.author.name)
          .addField('Link', `[Click Me](${embedLink}) \nRequested By: ${server.queue.requestedBy[0]}`)
          .setThumbnail(info.thumbnail_url)
          .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
          .setColor(0x0be289)
        message.channel.send(currentSongEmbed);

        server.queue.currentSongEmbed[0] = currentSongEmbed;
        server.queue.currentSongInfo = {title: server.queue.titles[0], link: server.queue.links[0], requestedBy: server.queue.requestedBy[0]}
        server.queue.titles.shift();
        server.queue.links.shift();
        server.queue.requestedBy.shift();
      }
    });

    server.dispatcher.on("end", () => {
      if(server.queue.links[0] && message.guild.voiceConnection)
        this.playSong(connection, message);
      else {
        server.queue.links = [];
        server.queue.titles = [];
        server.queue.requestedBy = [];
        server.queue.currentSongEmbed[0] = '';
        server.queue.currentSongInfo = {};
        connection.disconnect();
        server.queue.isPlaying = false;
        message.channel.send('Queue concluded.');
      }
    });
  }
}
