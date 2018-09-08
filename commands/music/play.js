const config = require('../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const search = require('youtube-search');
const opts = {
  maxResults: 10,
  key: process.env.GOOGLE_KEY
};

function play(connection, message) {
  let embed = new Discord.RichEmbed();
  let server = config.servers[message.guild.id];
  let embedLink = server.queue[0];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));

  YTDL.getInfo(embedLink.toString(), (err, info) => {
    if(info.title === undefined) {
      message.channel.send(`Can't read title of undefined`)
    }else {
      let minutes = Math.floor(info.length_seconds / 60);
      let seconds = Math.floor(info.length_seconds - minutes * 60);

      message.channel.send(embed
        .addField(info.title, info.author.name)
        .addField('Link', embedLink)
        .setThumbnail(info.thumbnail_url)
        .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
        .setColor(0x0be289)
      )
    }
  });

  server.queue.shift();

  server.dispatcher.on("end", () => {
    if(server.queue[0])
      play(connection, message);
    else {
      message.channel.send('Queue concluded.');
      connection.disconnect();
    }
  });
};

module.exports = {
  commands(message, args, server) {
    switch (args[0]) {
      case "play":

        if(!args[1]){
          message.channel.send("Please provide a link");
          return;
        }

        if(!message.member.voiceChannel) {
          message.channel.send("You must be in a voice channel");
          return;
        }

        if(args[1].startsWith('http')) {
          server.queue.push(args[1]);
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
            play(connection, message);
          })
          .catch(err => console.log("Failed at Play => ", err))
        }else {
          let songRequest = '';
          for(let i = 0; i < args.length; i++ ) {
            if(args[i] !== args[0]) songRequest += (args[i] + ' ');
          }
          let link;
          search(songRequest, opts, (err, results) => {
            if(err) return console.log(err);

            for(let i = 0; i < results.length; i++) {
              if(results[i].kind == 'youtube#video') {
                link = `${results[i].link}`;
                YTDL.getInfo(link.toString(), (err, info) => {
                  if(info.length_seconds > 3600) {
                    message.channel.send('Request Exceeds 60 min.')
                    return;
                  }else {
                    server.queue.push(link);
                    message.channel.send(`${results[i].title} added to the queue`);
                    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                      play(connection, message);
                    })
                    return;
                  }
                })
                return;
              }
            }
          })
        }
        break;
      case "skip":
        if(server.dispatcher)
          server.dispatcher.end();
        break;
      case "stop":
        if(message.guild.voiceConnection)
          message.guild.voiceConnection.disconnect();
        break;
      default:
        break;
    }
  }
};
