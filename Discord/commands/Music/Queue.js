const Discord = require('discord.js');
const utils = require('../utils/utils');
const pagination = require('../utils/pagination');

async function handlePages(message, bot, songs, overallLength, author) {
  let contentArr = [];
  let counter = 0;
  let fields = [];
    
  for(let i = 0; i < songs.length; i++) {
    counter++;
    let duration = await utils.timeParser(songs[i].duration);
    fields.push({ field: `${i + 1}. ${songs[i].title}`, value: `**Author**: ${songs[i].author}\n**Duration**: ${duration}` });
    if(counter === 5) {
        contentArr.push({ category: `Queue (${overallLength})`, author: author, fields: fields });
        counter = 0;
        fields = [];
    }
                  
    if(i === (songs.length - 1)) {
        contentArr.push({ category: `Queue (${overallLength})`, author: author, fields: fields });
        pagination(message, bot, contentArr, { thumbnail: 'https://i.imgur.com/OpSJJxe.png', color: 0x00ffff });
    }
  }  
};

async function handleSingle(message, server, overallLength, author) {
  let embed = new Discord.RichEmbed();
  
  embed.setTitle(`**QUEUE** (${overallLength})`).setColor(0x00ffff).setAuthor(author.text, author.image);

  server.queue.queueInfo.forEach((el, idx) => {
    embed.addField(`${(i + 1)}. ${el.title}`, `Link: [Click Me](${el.link})\nRequested By: ${el.requestedBy}`);
  });

  embed
  .addBlankField()
  .addField('**Current Song**', server.queue.currentSongInfo.title)
  .addField('Link', `[Click Me](${server.queue.currentSongInfo.link})`)
  .addField('Requested By:', server.queue.currentSongInfo.requestedBy)

  message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
  if(server.queue.queueInfo.length <= 1) return message.channel.send("No other songs in queue");

  let songs = server.queue.queueInfo;
  let author = { text: message.guild.name, image: message.guild.iconURL };
  let overallLength = 0;
  songs.forEach(el => overallLength += parseInt(el.duration, 10));
  overallLength = await utils.timeParser(overallLength);

  if(songs.length >= 5) handlePages(message, bot, songs, overallLength, author)
  else handleSingle(message, songs, overallLength, author);
};

module.exports.config = {
    name: 'queue',
    d_name: 'Queue',
    aliases: ['q'],
    category: 'Music',
    desc: 'Displays the queue',
    example: 'queue'
};