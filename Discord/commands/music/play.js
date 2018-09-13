const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const services = require('../services/apiServices');

const currentSong = require('./queue').currentSong;

const search = require('youtube-search');
const opts = {
  maxResults: 10,
  key: process.env.GOOGLE_KEY
};

function playSong(connection, message) {
  let currentSongEmbed = new Discord.RichEmbed();
  let server = config.servers[message.guild.id];
  let embedLink = server.queue.links[0];

  server.dispatcher = connection.playStream(YTDL(server.queue.links[0], {filter: 'audioonly'}));

  YTDL.getInfo(embedLink.toString(), (err, info) => {
    if(info.title === undefined) {
      message.channel.send(`Can't read title of undefined`)
    }else {
      let minutes = Math.floor(info.length_seconds / 60);
      let seconds = Math.floor(info.length_seconds - minutes * 60);

      message.channel.send(currentSongEmbed
        .addField(info.title, info.author.name)
        .addField('Link', embedLink)
        .setThumbnail(info.thumbnail_url)
        .setFooter(minutes + ' minutes ' + seconds + ' seconds ')
        .setColor(0x0be289)
      )
    }
  });
  server.queue.titles.shift();
  currentSong[0] = currentSongEmbed;
  server.queue.links.shift();

  server.dispatcher.on("end", () => {
    if(server.queue.links[0] && message.guild.voiceConnection)
      playSong(connection, message);
    else {
      connection.disconnect();
      message.channel.send('Queue concluded.');

      if(server.queue.links[0]) {
        for(let i = 0; i < server.queue.links.length; i++) {
          server.queue.titles.shift();
          server.queue.links.shift();
          currentSong[0] = '';
        }
      }
    }
  });
  server.dispatcher.on("meme", () => {
    message.channel.send('Fuck');
  })
};

module.exports = {
  play(message, args, server) {
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
            playSong(connection, message);
          })
          .catch(err => console.log("Failed at Play Song => ", err))
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
                    server.queue.titles.push(results[i].title);
                    server.queue.links.push(results[i].link);
                    message.channel.send(`${results[i].title} added to the queue`);
                    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                      playSong(connection, message);
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
      case "playlist":
        if(!message.member.voiceChannel) {
          message.channel.send("You must be in a voice channel");
          return;
        }
        if(!args[1]) {
          message.channel.send("No playlist name provided.");
          return;
        }
        services.getPlaylist(args[1])
          .then(playlist => {
            services.getSongs(playlist.data.data.playlist_id)
              .then(songs => {
                for(let i = 0; i < songs.data.data.length; i++) {
                  server.queue.titles.push(songs.data.data[i].title);
                  server.queue.links.push(songs.data.data[i].link);
                }
                message.channel.send(`Adding playlist ${playlist.data.data.name} to the queue.`);
                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                      playSong(connection, message);
                    })
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  }
};
