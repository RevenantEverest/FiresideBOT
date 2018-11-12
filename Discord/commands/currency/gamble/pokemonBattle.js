const config = require('../../../../config/config');
const currencyDB = require('../../../../models/currencyDB');
const discordCurrencyDB = require('../../../../models/discordCurrencyDB');
const pokemonServices = require('../../services/pokemonServices');

module.exports = {
  challenge(PREFIX, message, args, server) {
    if(!args[1] && !args[2]) return message.channel.send("Please specify an opponent and a currency amount to wager.\nYou can always challange FiresideBOT");
    if(!args[1]) return message.channel.send("Please specify an opponent.\nYou can always challange FiresideBOT");
    if(!args[2]) return message.channel.send("Please specify a currency amount to wager.");
    if(!Number.isInteger(parseInt(args[2], 10))) return message.channel.send('Please specify an integer value to give')
    if(!message.content.split(" ")[1].startsWith('<@')) return message.channel.send('Please specify a valid recipient');
    let challengeInfo = {
      opponentName: message.mentions.users.array()[0].username,
      opponentId: message.content.split(" ")[1].split("<@")[1].split(">")[0],
      challengerName: message.author.username,
      challengerId: message.author.id,
      wager: parseInt(args[2], 10)
    }
    currencyDB.findCurrencySettings(message.guild.id)
      .then(settings => {
        message.channel.send(`${challengeInfo.challengerName} has challenged ${challengeInfo.opponentName} has challenged to a Pokemon battle for ${challengeInfo.wager} ${settings.currency_name}.
          ${challengeInfo.opponent} accept this challenge with ` + "`?accept`");
        this.checkForAccept(PREFIX, message, args, server, challengeInfo);
      })
      .catch(err => {
        console.log(err);
      })
  },
  checkForAccept(PREFIX, message, args, server, challengeInfo) {
    const collector = new config.Discord.MessageCollector(message.channel, m => m.author.id === challengeInfo.opponentId, { time: 10000 });
    collector.on('collect', message => {
      if(message.content == `${PREFIX}accept`) {
        message.channel.send("Battle Begins...");
        this.battle(message, args, server, challengeInfo);
        collector.stop();
      }
    })
  },
  battle(message, args, server, challengeInfo) {
    let RNG_P1 = Math.floor(Math.random() * 802);
    let RNG_P2 = Math.floor(Math.random() * 802);
    pokemonServices.getPokemon(RNG_P1)
      .then(p1p => {
        pokemonServices.getPokemon(RNG_P2)
          .then(p2p => {
            let battleEmbed = new config.Discord.RichEmbed();
            let p1pTypes = '';
            let p2pTypes = '';
            for(let i = 0; i < p1p.data.types.length; i++) {
              p1pTypes += p1p.data.types[i].type.name.charAt(0).toUpperCase() + p1p.data.types[i].type.name.slice(1) + " ";
            }
            for(let i = 0; i < p2p.data.types.length; i++) {
              p2pTypes += p2p.data.types[i].type.name.charAt(0).toUpperCase() + p2p.data.types[i].type.name.slice(1) + " ";
            }
            battleEmbed
            .setTitle("**POKEMON BATTLE**")
            .addBlankField()
            .addField("Challenger", challengeInfo.challengerName)
            .addField("Pokemon", p1p.data.name.charAt(0).toUpperCase() + p1p.data.name.slice(1), true)
            .addField("Type", p1pTypes, true)
            .addBlankField()
            .addField("Opponent", challengeInfo.opponentName)
            .addField("Pokemon", p2p.data.name.charAt(0).toUpperCase() + p2p.data.name.slice(1), true)
            .addField("Type", p2pTypes, true)
            .setThumbnail('https://i.imgur.com/w2QGFgV.png')
            .setColor(0xff3300)

            message.channel.send(battleEmbed);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  },
  handleOutcome(message, args, server, challengeInfo) {

  }
}
