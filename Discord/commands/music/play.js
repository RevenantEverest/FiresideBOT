const config = require('../../../config/config');
const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const services = require('../services/apiServices');
const youtubeServices = require('../../../services/youtubeServices');

const currentSong = require('./queue').currentSong;

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
};

module.exports = {
  play(message, args, server) {
    switch (args[0]) {
      case "play":

        if(!args[1]) return message.channel.send("Please provide a link");
        if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");

        if(args[1].startsWith('http')) {
          server.queue.links.push(args[1]);
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
            playSong(connection, message);
          })
          .catch(err => console.log(err));
        }else {
          let songRequest = '';
          for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
          youtubeServices.youtubeSearch(songRequest)
            .then(results => {
              server.queue.titles.push(results.data.items[0].snippet.title);
              server.queue.links.push(`https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`);
              message.channel.send(`${results.data.items[0].snippet.title} was added to the queue.`)
              if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                playSong(connection, message);
              })
            })
            .catch(err => console.log(err));
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
      case "playnext":
        if(args[1].startsWith('http')) {
          server.queue.links.splice(0, 0, args[1]);
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
            playSong(connection, message);
          })
          .catch(err => console.log(err));
        }else {
          let songRequest = '';
          for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
          youtubeServices.youtubeSearch(songRequest)
            .then(results => {
              server.queue.titles.splice(0, 0, results.data.items[0].snippet.title);
              server.queue.links.splice(0, 0, `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`);
              message.channel.send(`${results.data.items[0].snippet.title} was added to the queue.`)
              if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                playSong(connection, message);
              })
            })
            .catch(err => console.log(err));
        }
        break;
      default:
        break;
    }
  }
};
