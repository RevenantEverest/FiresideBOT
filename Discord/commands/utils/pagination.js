const Discord = require('discord.js');

/*
  ContentArr Parsing Example:

  contentArr = [
    {
      category: '',
      fields: [
        {
          field: '',
          value: ''
        }
      ]
    }
  ]

  Options Parsing Example:

  options = {
    time: 1,
    thumbnail: '',
    flavorText: '',
    color: 0xff0000,
    title: true,
    author: true
  }

*/

async function handleBackButton(contentArr, options, index, reaction) {
  let embed = new Discord.RichEmbed();

  if(options.title) embed.setTitle(`**${contentArr[index].category}**`).addBlankField();
  else if(!options.title) embed.addField(`**${contentArr[index].category[0]}**`, contentArr[index].category[1]).addBlankField();

  if(options.author) embed.setAuthor(contentArr[index].author.text, contentArr[index].author.image);
  if(options.thumbnail) embed.setThumbnail(options.thumbnail);

  embed
  .setColor(options.color)
  .setFooter(`Page ${index + 1}/${contentArr.length}`);

  contentArr[index].fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));

  reaction.message.edit(options.flavorText, embed);
  reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
}

async function handleForwardButton(contentArr, options, index, reaction) {
  let embed = new Discord.RichEmbed();

  if(options.title) embed.setTitle(`**${contentArr[index].category}**`).addBlankField();
  else if(!options.title) embed.addField(`**${contentArr[index].category[0]}**`, contentArr[index].category[1]).addBlankField();

  if(options.author) embed.setAuthor(contentArr[index].author.text, contentArr[index].author.image);
  if(options.thumbnail) embed.setThumbnail(options.thumbnail);

  embed
  .setColor(options.color)
  .setFooter(`Page ${index + 1}/${contentArr.length}`);
        
  contentArr[index].fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));

  reaction.message.edit(options.flavorText, embed);
  reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
}

module.exports = async (message, bot, contentArr, options) => {
  if(!options.time) options.time = 1;
  if(!options.title) options.title = true;
  if(!options.author) options.author = false;

  let embed = new Discord.RichEmbed();
  let index = 0;

  if(options.title) embed.setTitle(`**${contentArr[index].category}**`).addBlankField();
  else if(!options.title) embed.addField(`**${contentArr[index].category[0]}**`, contentArr[index].category[1]).addBlankField();

  if(options.author) embed.setAuthor(contentArr[index].author.text, contentArr[index].author.image);
  if(options.thumbnail) embed.setThumbnail(options.thumbnail);

  embed
  .setColor(options.color)
  .setFooter(`Page ${index + 1}/${contentArr.length}`);

  contentArr[index].fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));

  message.channel.send(options.flavorText, embed).then(async (msg) => {
    await msg.react("⏪");
    await msg.react("⏹");
    await msg.react("⏩");
    
    const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: (options.time * 60000) });

    r_collector.on('collect', (reaction, user) => {

      if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;

      if(reaction.emoji.name === "⏪") {
        if(index === 0) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        index --;
        handleBackButton(contentArr, options, index, reaction);
      }
      else if(reaction.emoji.name === "⏩") {
        if(index === (contentArr.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        index++;
        handleForwardButton(contentArr, options, index, reaction);
      }
      else if(reaction.emoji.name === "⏹") r_collector.stop();
    });

    r_collector.on('end', e => msg.delete());

  })
  .catch(err => console.log(err))
}