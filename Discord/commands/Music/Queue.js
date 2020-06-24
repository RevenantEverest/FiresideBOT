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
        pagination(message, bot, contentArr, { thumbnail: 'https://i.imgur.com/OpSJJxe.png', title: true, color: 0x00ffff });
    }
  }  
};

async function handleSingle(message, songs, overallLength, author) {
  let embed = new Discord.MessageEmbed();
  
  embed.setTitle(`**QUEUE** (${overallLength})`).setColor(0x00ffff).setAuthor(author.text, author.image);

  await songs.forEach(async (el, idx) => {
    let duration = await utils.timeParser(el.duration);
    embed.addField(`${idx + 1}. ${el.title}`, `**Author**: ${el.author}\n**Duration**: ${duration}`);
  });

  message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
  if(server.queue.queueInfo.length < 1) return message.channel.send("No other songs in queue");

  let songs = server.queue.queueInfo;
  let author = { text: message.guild.name, image: message.guild.iconURL({ dynamic: true }) };
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
    desc: 'Displays the current queue',
    example: 'queue'
};