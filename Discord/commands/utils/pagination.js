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

*/

module.exports = async (message, bot, contentArr, flavorText, color, time) => {
  if(!time) time = 1;

  let embed = new Discord.RichEmbed();
  let index = 0;

  embed
    .setTitle(`**${contentArr[index].category}**`)
    .addBlankField()
    .setColor(color)
    .setFooter(`Page ${index + 1}/${contentArr.length}`);

  contentArr[index].fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));

  message.channel.send(flavorText, embed).then(async (msg) => {
    await msg.react("⏪");
    await msg.react("⏹");
    await msg.react("⏩");
    
    const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: (time * 60000) });

    r_collector.on('collect', (reaction, user) => {

      if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;

      if(reaction.emoji.name === "⏪") {

        if(index === 0) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

        index--;

        let backEmbed = new Discord.RichEmbed();

        backEmbed
          .setTitle(`**${contentArr[index].category}**`)
          .addBlankField()
          .setColor(color)
          .setFooter(`Page ${index + 1}/${contentArr.length}`);

        contentArr[index].fields.forEach(el => backEmbed.addField(`${el.field}`, `${el.value}`, el.inline));

        reaction.message.edit(flavorText, backEmbed);
        reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

      }
      else if(reaction.emoji.name === "⏩") {
        
        if(index === (contentArr.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

        index++;

        let forwardEmbed = new Discord.RichEmbed();

        forwardEmbed
          .setTitle(`**${contentArr[index].category}**`)
          .addBlankField()
          .setColor(color)
          .setFooter(`Page ${index + 1}/${contentArr.length}`);
        
        contentArr[index].fields.forEach(el => forwardEmbed.addField(`${el.field}`, `${el.value}`, el.inline));

        reaction.message.edit(flavorText, forwardEmbed);
        reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

      }
      else if(reaction.emoji.name === "⏹")
        r_collector.stop();
    });

    r_collector.on('end', e => msg.delete());

  })
  .catch(err => console.log(err))
}