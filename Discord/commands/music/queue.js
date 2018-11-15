const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

// TODO: If queue exceeds 20 songs, display reaction based pages
module.exports = {
  queue(message, args, server, self) {
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
      message.channel.send(queueEmbed).then(msg => {
        msg.react("⏹");
        const r_collector = new config.Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', (reaction, user) => {
          if(reaction.users.array()[reaction.users.array().length - 1].id === self.user.id) return;
          if(reaction.emoji.name === "⏹") r_collector.stop();
        });
        r_collector.on('end', e => {
          msg.delete();
          message.delete();
        })
      });
    }else {
      message.channel.send("No other songs in queue");
    }
  },
  showCurrentSong(message, args, server) {
    if(server.queue.isPlaying === false) return message.channel.send("No song currently playing");
    else return message.channel.send(server.queue.currentSongEmbed[0]);
  }
}
