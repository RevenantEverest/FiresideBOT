const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

module.exports = {
  currentSong: [],
  queue(message, args, server) {
    let queueEmbed = new Discord.RichEmbed();
    if(server.queue.titles.length >= 1) {
      for(let i = 0; i < server.queue.titles.length; i++) {
        queueEmbed.addField((i + 1 + ". ") + server.queue.titles[i], "Link: " + server.queue.links[i] );
      }
      return queueEmbed;
    }else {
      return "No other songs in queue.";
    }
  },
  showCurrentSong(message, args, server) {
    return this.currentSong[0];
  }
}
