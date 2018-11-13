const config = require('../../../config/config');
const c_Help = require('./helpOverview');
const specificHelp = require('./specificHelp');

module.exports = {
  sendHelp(PREFIX, message, args, server, self) {
    if(args[1]) return specificHelp.help(PREFIX, message, args, server, self);
    let HelpEmbed = new config.Discord.RichEmbed();
    let currentHelpIndex = 0;
    HelpEmbed.setTitle(`**${c_Help[currentHelpIndex].title}**`).addBlankField().setColor(0xcc00ff);
    for(let i = 0; i < c_Help[currentHelpIndex].fields.length; i++) {
      HelpEmbed.addField(c_Help[currentHelpIndex].fields[i].name, c_Help[currentHelpIndex].fields[i].value)
    }
    let flavor_text = "`<param>` is a required param and `[param]` is an optional param. For more information on a command use `" + PREFIX + "help <command>` ™";
    message.channel.send(flavor_text, HelpEmbed).then(async (msg) => {
      await msg.react("⏪");
      await msg.react("⏹");
      await msg.react("⏩");
      const r_collector = new config.Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
      r_collector.on('collect', (reaction, user) => {
        if(reaction.users.array()[reaction.users.array().length - 1].id === self.user.id) return;
        if(reaction.emoji.name === "⏪") {
          if(currentHelpIndex === 0) returnreaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
          currentHelpIndex--;
          let backEmbed = new config.Discord.RichEmbed();
          backEmbed.setTitle(`**${c_Help[currentHelpIndex].title}**`).addBlankField().setColor(0xcc00ff);
          for(let i = 0; i < c_Help[currentHelpIndex].fields.length; i++) {
            backEmbed.addField(c_Help[currentHelpIndex].fields[i].name, c_Help[currentHelpIndex].fields[i].value)
          }
          reaction.message.edit(flavor_text, backEmbed);
          reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        }else if(reaction.emoji.name === "⏩") {
          if(currentHelpIndex === (c_Help.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
          currentHelpIndex++;
          let forwardEmbed = new config.Discord.RichEmbed();
          forwardEmbed.setTitle(`**${c_Help[currentHelpIndex].title}**`).addBlankField().setColor(0xcc00ff);
          for(let i = 0; i < c_Help[currentHelpIndex].fields.length; i++) {
            forwardEmbed.addField(c_Help[currentHelpIndex].fields[i].name, c_Help[currentHelpIndex].fields[i].value)
          }
          reaction.message.edit(flavor_text, forwardEmbed);
          reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        }else if(reaction.emoji.name === "⏹") {
          r_collector.stop();
        }
      });
      r_collector.on('end', e => {
        msg.delete();
        message.delete();
      })
    })
    .catch(err => console.log(err))
  }
}
