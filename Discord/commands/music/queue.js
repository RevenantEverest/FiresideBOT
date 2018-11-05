const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

module.exports = {
  queue(message, args, server) {
    let queueEmbed = new Discord.RichEmbed();
    if(server.queue.titles.length >= 1) {
      for(let i = 0; i < server.queue.titles.length; i++) {
        queueEmbed.addField((i + 1 + ". ") + server.queue.titles[i], `Link: [Click Me](${server.queue.links[i]}) \nRequested By: ${server.queue.requestedBy[i]}`);
      }
      queueEmbed
      .setColor(0x0ccff)
      .addBlankField()
      .addField('**Current Song**', server.queue.currentSongInfo.title)
      .addField('Link', `[Click Me](${server.queue.currentSongInfo.link})`)
      .addField('Requested By:', server.queue.currentSongInfo.requestedBy)
      return queueEmbed;
    }else {
      return "No other songs in queue.";
    }
  },
  showCurrentSong(message, args, server) {
    return server.queue.currentSongEmbed[0];
  }
}
