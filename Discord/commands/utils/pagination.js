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

async function handleEmbed(contentArr, options, index) {
  let embed = new Discord.RichEmbed();

  if(options.title) embed.setTitle(`**${contentArr[index].category}**`).addBlankField();
  else if(!options.title) embed.addField(`**${contentArr[index].category[0]}**`, contentArr[index].category[1]).addBlankField();

  if(contentArr[index].author) embed.setAuthor(contentArr[index].author.text, contentArr[index].author.image);
  if(options.thumbnail) embed.setThumbnail(options.thumbnail);

  embed
  .setColor(options.color)
  .setFooter(`Page ${index + 1}/${contentArr.length}`);

  contentArr[index].fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));

  return embed;
};

async function handleMessage(message, msg, bot, contentArr, options, index) {
  await msg.react("⏪");
  await msg.react("⏹");
  await msg.react("⏩");
    
  const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: (options.time * 60000) });

  r_collector.on('collect', async (reaction, user) => {
    if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
    if(reaction.emoji.name === "⏹") return r_collector.stop();

    if(reaction.emoji.name === "⏪") index === 0 ? index = (contentArr.length - 1) : index--;
    else if(reaction.emoji.name === "⏩") index === (contentArr.length - 1) ? index = 0 : index++;

    embed = await handleEmbed(contentArr, options, index);

    reaction.message.edit(options.flavorText, embed);
  });
  r_collector.on('end', e => msg.clearReactions());
};

module.exports = async (message, bot, contentArr, options) => {
  if(!options.time) options.time = 1;

  let index = 0;

  let embed = await handleEmbed(contentArr, options, index);

  if(options.dm)
    message.author.send(options.flavorText, embed)
    .then(msg => handleMessage(message, msg, bot, contentArr, options, index))
    .catch(err => console.error(err));
  else
    message.channel.send(options.flavorText, embed)
    .then(msg => handleMessage(message, msg, bot, contentArr, options, index))
    .catch(err => console.log(err));
};