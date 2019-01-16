const Discord = require('discord.js');

function sendHelp(PREFIX, message, args, server, bot, c) {
  let HelpEmbed = new Discord.RichEmbed();
  let CHI = 0;
  HelpEmbed.setTitle(`**${c[CHI].category}**`).addBlankField().setColor(0xcc00ff);
  for(let i = 0; i < c[CHI].commands.length; i++) {
    let paramField = '';
    if(c[CHI].commands[i].params.required)
      paramField = '<Param>';
    else if(c[CHI].commands[i].params.optional)
      paramField = '[Param]';
    HelpEmbed.addField(`${c[CHI].commands[i].d_name} ${paramField}`, c[CHI].commands[i].desc);
  }
  let flavor_text = "`<param>` is a required param and `[param]` is an optional param. For more information on a command use `" + PREFIX + "help <command>` ™";
  message.channel.send(flavor_text, HelpEmbed).then(async (msg) => {
    await msg.react("⏪");
    await msg.react("⏹");
    await msg.react("⏩");
    
    const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
    r_collector.on('collect', (reaction, user) => {
      if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
      if(reaction.emoji.name === "⏪") {
        if(CHI === 0) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        CHI--;
        let backEmbed = new Discord.RichEmbed();
        backEmbed.setTitle(`**${c[CHI].category}**`).addBlankField().setColor(0xcc00ff);
        for(let i = 0; i < c[CHI].commands.length; i++) {
          let paramField = '';
          if(c[CHI].commands[i].params.required)
            paramField = '<Param>';
          else if(c[CHI].commands[i].params.optional)
            paramField = '[Param]';
          backEmbed.addField(`${c[CHI].commands[i].d_name} ${paramField}`, c[CHI].commands[i].desc)
        }
        reaction.message.edit(flavor_text, backEmbed);
        reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
      }else if(reaction.emoji.name === "⏩") {
        if(CHI === (c.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        CHI++;
        let forwardEmbed = new Discord.RichEmbed();
        forwardEmbed.setTitle(`**${c[CHI].category}**`).addBlankField().setColor(0xcc00ff);
        for(let i = 0; i < c[CHI].commands.length; i++) {
          let paramField = '';
          if(c[CHI].commands[i].params.required)
            paramField = '<Param>';
          else if(c[CHI].commands[i].params.optional)
            paramField = '[Param]';
          forwardEmbed.addField(`${c[CHI].commands[i].d_name} ${paramField}`, c[CHI].commands[i].desc)
        }
        reaction.message.edit(flavor_text, forwardEmbed);
        reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
      }else if(reaction.emoji.name === "⏹") {
        r_collector.stop();
      }
    });
    r_collector.on('end', e => {
      msg.delete();
    })
  })
  .catch(err => console.log(err))
};

function helpSpec(PREFIX, message, args, server, bot) {
    let helpEmbed = new Discord.RichEmbed();
    if(!bot.commands.get(args[1].toLowerCase())) return;
    let helpInfo = bot.commands.get(args[1].toLowerCase());
    let paramInfo = { isRequired: 'NA', param: 'NA' };
    if(helpInfo.config.params.required) {
      paramInfo.isRequired = 'Required';
      paramInfo.param = helpInfo.config.params.params;
    }else if(helpInfo.config.params.optional) {
      paramInfo.isRequired = 'Optional';
      paramInfo.param = helpInfo.config.params.params;
    }
    helpEmbed
    .setColor(0xcc00ff)
    .addField(`**${helpInfo.config.d_name}**`, `${helpInfo.config.desc}`)
    .addField('Param Type: ', `${paramInfo.isRequired}`, true)
    .addField('Params: ', paramInfo.param, true)
    .addField('Category: ', `${helpInfo.config.category[1]}`)
    .addField(`More Info:`, `[Click Here](http://www.firesidebot.com/help/commands/${helpInfo.config.name})`)
    message.channel.send(helpEmbed);
};

module.exports.run = async (PREFIX, message, args, server, bot) => {
    let c = [{category: 'Music', commands: []}, {category: 'Economy', commands: []}, {category: 'Fun', commands: []}, {category: 'Info', commands: []}];

    for(let i = 0; i < bot.commands.array().length; i++) {
      if(bot.commands.array()[i].config.category[1]) {
        switch(bot.commands.array()[i].config.category[1]) {
          case "Music":
            c[0].commands.push(bot.commands.array()[i].config); 
            break;
          case "Economy":
            c[1].commands.push(bot.commands.array()[i].config);
            break;
          case "Fun":
            c[2].commands.push(bot.commands.array()[i].config);
            break;
          case "Info":
            c[3].commands.push(bot.commands.array()[i].config);
            break;
          default: break;
        }
      }
    }

    if(!args[1])
        sendHelp(PREFIX, message, args, server, bot, c);
    else 
        helpSpec(PREFIX, message, args, server, bot);
};

module.exports.config = {
    name: 'help',
    d_name: 'Help',
    aliases: [],
    params: { required: false, optional: true, params: 'Category or Command' },
    category: ['info', 'Info'],
    desc: 'Displays Help embed'
};