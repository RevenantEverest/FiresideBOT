require('dotenv').config();

const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const PREFIX = '?';
const key = process.env.KEY;

let bot = new Discord.Client();
let embed = new Discord.RichEmbed();
let servers = {};

// let search = require('youtube-search');
//
// let opts = {
//   maxResults: 10
// };

// search('jsconf', opts, (err, results) => {
//   if(err) return console.log(err);
//
//   console.dir(results);
// });

let fortunes = [
  "Yes",
  "No",
  "Maybe",
  "Fuck You",
  "If you believe hard enough",
  "Try asking again",
  "Kill Yourself",
  "Sure",
  "Fair Enough",
  "Please stop",
  "Incorrect",
  "You got it",
  "Mhm"
];

function play(connection, message) {
  let server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));

  server.queue.shift();

  server.dispatcher.on("end", () => {
    if(server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

bot.on("message", (message) => {
  if(message.author.equals(bot.user)) return;

  if(!message.content.startsWith(PREFIX)) return;

  let args = message.content.substring(PREFIX.length).split(" ");

  if(!servers[message.guild.id]) servers[message.guild.id] = {
    queue: []
  };

  let server = servers[message.guild.id]

  switch (args[0].toLowerCase()) {
    case "ping":
      message.channel.send("pong")
      break;

    // case "commands":
    //   message.channel.send(
    //     embed
    //     .addField(`!ping :` ,`Responds with "pong"`, true)
    //     .addField(`!8ball :`, `Responds with a fortune but requires a question (ex. !8ball Am I emotionally stable?)`, true)
    //     .setColor(0xff0080)
    //   );
    //   break;

    case "8ball":
      if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.send("Ask a question.");
      break;

    case "dice":
      message.channel.send('You rolled a ' + (Math.floor(Math.random() * 20)));
      break;

    case "embed":
      message.channel.send(embed.setDescription("This is an embed"));
      break;

    //Music Commands
    case "play":
      if(!args[1]){
        message.channel.send("Please provide a link");
        return;
      }

      if(!message.member.voiceChannel) {
        message.channel.send("You must be in a voice channel");
        return;
      }

      server.queue.push(args[1]);

      YTDL.getInfo(server.queue[0].toString(), (err, info) => {
        if(info.title === undefined) {
          message.channel.send("Can't read title of undefined")
        }else {
          let minutes = Math.floor(info.length_seconds / 60);
          let seconds = Math.floor(info.length_seconds - minutes * 60);

          message.channel.send(embed
            .addField(info.title, info.author.name)
            .addField('Link', args[1])
            .setThumbnail(info.thumbnail_url)
            .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
            .setColor(0x0be289)
          )
        }
      })

      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
        play(connection, message);
      })
      break;
    case "queue":
      console.log(server.queue);
      break;
    case "skip":
      if(server.dispatcher) server.dispatcher.end();
      break;
    case "stop":
      if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
      break;
    default:
      message.channel.send("Not a valid command");
      break;
  }
})

bot.login(key);
