const config = require('../../../config/config');
const Help_Desc = require('./helpDesc');

module.exports = {
  help(PREFIX, message, args, server, self) {
    let s_HelpEmbed = new config.Discord.RichEmbed();
    let _Help = '';
    for(let i = 0; i < Help_Desc.length; i++) {
      for(let x = 0; x < Help_Desc[i].length; x++) {
        if(Help_Desc[i][x].command === args[1]) {
          _Help = Help_Desc[i][x];
        }
      }
    }

    s_HelpEmbed
    .setTitle("**HELP -** "+ _Help.command.charAt(0).toUpperCase() + _Help.command.slice(1))
    .addBlankField()
    .setColor(0xcc00ff)

    for(let i = 0; i < _Help.fields.length; i++) {
      s_HelpEmbed.addField(_Help.fields[i].name, _Help.fields[i].value)
    }
    message.channel.send(s_HelpEmbed).then(msg => {
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
  }
}
