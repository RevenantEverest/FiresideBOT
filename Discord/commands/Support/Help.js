const Discord = require('discord.js');
const pagination = require('../utils/pagination');

function helpSpec(PREFIX, message, args, bot, contentArr) {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xcc00ff);

    if(contentArr[contentArr.map(e => e.category.toLowerCase()).indexOf(args[1].toLowerCase())]) {
      let helpInfo = contentArr[contentArr.map(e => e.category.toLowerCase()).indexOf(args[1].toLowerCase())];
      embed.setTitle(`**${helpInfo.category}**`);
      helpInfo.fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));
    } 
    else if(bot.commands.get(args[1].toLowerCase())) {
      let helpInfo = bot.commands.get(args[1].toLowerCase()).config;

      embed
      .addField(`**${helpInfo.d_name}**`, `${helpInfo.desc}`)
      .addBlankField()
      
      if(helpInfo.params)
        embed
        .addField('Param Type: ', `${helpInfo.params.required ? 'Required' : 'Optional'}`, true)
        .addField('Params: ', helpInfo.params.params, true)

      if(helpInfo.flags)
        embed
        .addField('Flags:', helpInfo.flags.join(", "), true)

      embed
      .addField('Category: ', `${helpInfo.category}`, true)
      .addField('Example:', "`" + PREFIX + helpInfo.example + "`")
      .addField(`More Info:`, `[Click Here](https://help.firesidebot.com)`)
    }
    else
      return message.channel.send('Invalid Command or Category');

    message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    let categories = ['Admin', 'Economy', 'Fun', 'GameStats', 'Info', 'Music', 'Other', 'Support'];
    let contentArr = [
      {
        category: `Welcome to the FiresideBOT Help Command`,
        fields: [
          {
            field: 'Available Categories:',
            value: categories.join(" **|** ")
          },
          {
            field: 'How To Use:',
            value: 'Use the reactions below to move back and forth through the menu',
            inline: true
          },
          {
            field: 'More Info:',
            value: 'To get more info about a command or category use the help command again with the desired command or category afterwards\n`Example: ' + PREFIX + 'help Music`',
            inline: true
          }
        ]
      }
    ];  
    let commands = bot.commands.array();

    categories.forEach(el => contentArr.push({ category: el, fields: [] }));

    commands.forEach(el => {
      if(el.config.category && contentArr[contentArr.map(e => e.category).indexOf(el.config.category)])
        contentArr[contentArr.map(e => e.category).indexOf(el.config.category)].fields.push({
          field: `${el.config.d_name} ${el.config.params ? (el.config.params.required ? '`<param>`' : '`[param]`') : ''}`, 
          value: (el.config.desc === '' ? '*N/A*' : el.config.desc),
          inline: false
        });
    });

    let flavorText = "`<param>` is a required param and `[param]` is an optional param. For more information on a command use `" + PREFIX + "help <command>` ™";

    if(!args[1])
        pagination(message, bot, contentArr, flavorText, 0xcc00ff);
    else 
        helpSpec(PREFIX, message, args, bot, contentArr);
};

module.exports.config = {
    name: 'help',
    d_name: 'Help',
    aliases: [],
    params: { required: false, params: 'Category or Command' },
    category: 'Support',
    desc: 'Displays Help embed',
    example: 'help economy'
};