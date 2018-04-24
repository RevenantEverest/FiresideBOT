require('dotenv').config();

const Discord = require('discord.js');
const PREFIX = '?';
const key = process.env.KEY;

let bot = new Discord.Client();

let embed = new Discord.RichEmbed();

let fortunes = [
  "Yes",
  "No",
  "Maybe",
  "Fuck You",
  "If you believe hard enough",
  "Try asking again",
  "Kill Yourself"
];

let commands = [
  "Commands Are: ",
  "ping",
  "8ball"
];

bot.on("message", (message) => {
  if(message.author.equals(bot.user)) return;

  if(!message.content.startsWith(PREFIX)) return;

  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "ping":
      message.channel.sendMessage("pong")
      break;
    case "commands":
      message.channel.sendMessage(
        embed
        .addField(`!ping :` ,`Responds with "pong"`, true)
        .addField(`!8ball :`, `Responds with a fortune but requires a question (ex. !8ball Am I emotionally stable?)`, true)
        .setColor(0xff0080)
      );
      break;
    case "8ball":
      if(args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.sendMessage("Ask a question.");
      break;
    case "embed":
      message.channel.sendMessage(embed.setDescription("This is an embed"));
      break;
    default:
      "Not a valid command"
      break;
  }
})

bot.login(key);
