const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const currentSong = require('./queue').currentSong;

module.exports = {
  playSong(connection, message) {
    let currentSongEmbed = new Discord.RichEmbed();
    let server = config.servers[message.guild.id];
    let embedLink = server.queue.links[0];

    server.dispatcher = connection.playStream(YTDL(server.queue.links[0], {filter: 'audioonly', quality: 'highestaudio'}));

    YTDL.getInfo(embedLink.toString(), (err, info) => {
      if(err) return message.channel.send("YTDL Get Info error.");
      if(info.title === undefined) {
        message.channel.send(`Can't read title of undefined`)
      }else {
        let minutes = Math.floor(info.length_seconds / 60);
        let seconds = Math.floor(info.length_seconds - minutes * 60);

        message.channel.send(currentSongEmbed
          .addField(info.title, info.author.name)
          .addField('Link', embedLink)
          .setThumbnail(info.thumbnail_url)
          .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
          .setColor(0x0be289)
        )
      }
    });
    server.queue.titles.shift();
    currentSong[0] = currentSongEmbed;
    server.queue.links.shift();

    server.dispatcher.on("end", () => {
      if(server.queue.links[0] && message.guild.voiceConnection)
        this.playSong(connection, message);
      else {
        server.queue.links = [];
        server.queue.titles = [];
        currentSong[0] = '';
        connection.disconnect();
        message.channel.send('Queue concluded.');
      }
    });
  }
}
