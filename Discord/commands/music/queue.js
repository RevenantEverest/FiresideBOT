const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

module.exports = {
  queue(message, args, server) {
    let queueEmbed = new Discord.RichEmbed();
    queueEmbed.setTitle('**QUEUE**');
    if(server.queue.queueInfo.length >= 1) {
      for(let i = 0; i < server.queue.queueInfo.length; i++) {
        if(i >= 18) continue;
        let des = `Link: [Click Me](${server.queue.queueInfo[i].link}) \nRequested By: ${server.queue.queueInfo[i].requestedBy}`
        queueEmbed.addField((i + 1 + ". ") + server.queue.queueInfo[i].title, des);
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
