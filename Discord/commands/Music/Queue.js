const Discord = require('discord.js');

async function handlePages(message, args, server, songArr, bot) {
  let embed = new Discord.RichEmbed();
  let CPI = 0;

  embed.setTitle(`**Queue**`).setFooter(`Page ${CPI + 1}/${songArr.length}`).setColor(0xcc00ff);

  let counter = 0;

  for(let i = 0; i < songArr[CPI].length; i++) {counter++;
      let minutes = Math.floor(songArr[CPI][i].songs.duration / 60);
      let seconds = Math.floor(songArr[CPI][i].songs.duration - minutes * 60);
      embed.addField(`**${songArr[CPI][i].index}. ${songArr[CPI][i].songs.title}**`, `Author: ${songArr[CPI][i].songs.author} \n Duration: ${minutes}:${seconds}`);
  }

  embed
  .addBlankField()
  .addField('**Current Song**', server.queue.currentSongInfo.title)
  .addField('Link', `[Click Me](${server.queue.currentSongInfo.link})`)
  .addField('Requested By:', server.queue.currentSongInfo.requestedBy)
  .addBlankField()

  message.channel.send(embed).then(async (msg) => {
      await msg.react("⏪");
      await msg.react("⏹");
      await msg.react("⏩");

      const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
      r_collector.on('collect', (reaction, user) => {
          if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
          if(reaction.emoji.name === "⏪") {

              if(CPI === 0) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
              CPI--;
              let backEmbed = new Discord.RichEmbed();
              backEmbed.setTitle(`**Queue**`).setFooter(`Page ${CPI + 1}/${songArr.length}`).setColor(0x0ccff);

              for(let i = 0; i < songArr[CPI].length; i++) {counter++;
                  let minutes = Math.floor(songArr[CPI][i].songs.duration / 60);
                  let seconds = Math.floor(songArr[CPI][i].songs.duration - minutes * 60);
                  backEmbed.addField(`**${songArr[CPI][i].index}. ${songArr[CPI][i].songs.title}**`, `Author: ${songArr[CPI][i].songs.author} \n Duration: ${minutes}:${seconds}`);
              }

              backEmbed
              .addBlankField()
              .addField('**Current Song**', server.queue.currentSongInfo.title)
              .addField('Link', `[Click Me](${server.queue.currentSongInfo.link})`)
              .addField('Requested By:', server.queue.currentSongInfo.requestedBy)
              .addBlankField()

              reaction.message.edit(backEmbed);
              reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

          }else if(reaction.emoji.name === "⏩") {

              if(CPI === (songArr.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

              CPI++;
              let forwardEmbed = new Discord.RichEmbed();
              forwardEmbed.setTitle(`**Queue**`).setFooter(`Page ${CPI + 1}/${songArr.length}`).setColor(0x0ccff);

              for(let i = 0; i < songArr[CPI].length; i++) {counter++;
                  let minutes = Math.floor(songArr[CPI][i].songs.duration / 60);
                  let seconds = Math.floor(songArr[CPI][i].songs.duration - minutes * 60);
                  forwardEmbed.addField(`**${songArr[CPI][i].index}. ${songArr[CPI][i].songs.title}**`, `Author: ${songArr[CPI][i].songs.author} \n Duration: ${minutes}:${seconds}`);
              }

              forwardEmbed
              .addBlankField()
              .addField('**Current Song**', server.queue.currentSongInfo.title)
              .addField('Link', `[Click Me](${server.queue.currentSongInfo.link})`)
              .addField('Requested By:', server.queue.currentSongInfo.requestedBy)
              .addBlankField()

              reaction.message.edit(forwardEmbed);
              reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

          }else if(reaction.emoji.name === "⏹") {
              r_collector.stop();
          }
      });
      r_collector.on('end', e => {
          msg.delete();
      })
  })
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let queueEmbed = new Discord.RichEmbed();
    queueEmbed.setTitle('**QUEUE**').setColor(0x0ccff);
    if(server.queue.queueInfo.length >= 1) {
      if(server.queue.queueInfo.length >= 20) {
        let counter = 0;
        let temp = [];
        let songArr = [];
        for(let i = 0; i < server.queue.queueInfo.length; i++) {
          counter++;
          temp.push({ index: i + 1, songs: server.queue.queueInfo[i]});
          if(counter === 18) {
            songArr.push(temp);
            counter = 0;
            temp = [];
          }
        }
        songArr.push(temp);
        handlePages(message, args, server, songArr, bot);

      }else {
        for(let i = 0; i < server.queue.queueInfo.length; i++) {
          let des = `Link: [Click Me](${server.queue.queueInfo[i].link}) \nRequested By: ${server.queue.queueInfo[i].requestedBy}`
          queueEmbed.addField((i + 1 + ". ") + server.queue.queueInfo[i].title, des);
        }
        queueEmbed
        .addBlankField()
        .addField('**Current Song**', server.queue.currentSongInfo.title)
        .addField('Link', `[Click Me](${server.queue.currentSongInfo.link})`)
        .addField('Requested By:', server.queue.currentSongInfo.requestedBy)
        message.channel.send(queueEmbed).then(msg => {
          msg.react("⏹");
          const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
          r_collector.on('collect', (reaction, user) => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
            if(reaction.emoji.name === "⏹") r_collector.stop();
          });
          r_collector.on('end', e => {
            msg.delete();
            message.delete();
          })
        });
      }
    }else {
      message.channel.send("No other songs in queue");
    }
};

module.exports.config = {
    name: 'queue',
    d_name: 'Queue',
    aliases: ['q'],
    category: 'Music',
    desc: 'Displays the queue',
    example: 'queue'
};