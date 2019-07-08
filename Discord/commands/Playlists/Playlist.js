const config = require("../../config/config");
const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const playSong = require('../utils/playSong');
const myPlaylists = require('../utils/myPlaylists');
const viewPlaylist = require('../utils/viewPlaylist');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getSongs(args, message, server, playlist) {
  userSongsDB.findByPlaylistId(playlist.playlist_id)
  .then(songs => addToQueue(args, message, server, playlist, songs))
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
      message.channel.send('No songs found in playlist `' + playlist.name + '`');
    else console.log(err);
  });
}

async function addToQueue(args, message, server, playlist, songs) {
  if(args.includes("-s")) songs = await utils.shuffle(songs);
  songs.forEach((el, idx) => {
    server.queue.queueInfo.push({
      title: el.title, link: el.link, author: el.author, duration: el.duration, thumbnail: el.thumbnail_url, requestedBy: message.author.username
    });

    if(idx === (songs.length - 1)) {
      message.channel.send(`Adding playlist **${playlist.name}** to the queue`);
      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
        playSong.playSong(connection, message, server);
      })
    }
  })
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
  if(!args[1]) return myPlaylists.findMyPlaylists(message, args, message.author.id, bot);
  
  let playlistName = null;
  let discord_id = null;

  if(/<@?(\d+)>/.exec(args.join(" "))) discord_id = /<@?(\d+)>/.exec(args.join(" "))[1];
  else if(/<@!?(\d+)>/.exec(args.join(" "))) discord_id = /<@!?(\d+)>/.exec(args.join(" "))[1];

  if(discord_id) {
    args.splice(args.indexOf(`<@${discord_id}>`), 1);
    if(!args.includes("-i")) return myPlaylists.findMyPlaylists(message, args, discord_id, bot);
  }

  playlistName = args[1] === "-s" || args[1] === '-i' ? args[2] : args[1];

  userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: (discord_id ? discord_id : message.author.id), name: playlistName })
    .then(playlist => {
      if(discord_id && !playlist.public && discord_id !== message.author.id) return message.channel.send("That users playlist is **Private**");
      if(args.includes("-i")) return viewPlaylist.viewUserPlaylist(message, (discord_id ? discord_id : message.author.id), playlist, bot);
      if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update");
      if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
      getSongs(args, message, server, playlist);
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        message.channel.send('No playlist found by that name');
      else console.log(err);
    })
};

module.exports.config = {
    name: 'playlist',
    d_name: 'Playlist',
    aliases: ['playlists'],
    params: { required: false, params: 'Playlist Name' },
    flags: ['-i', '-s'],
    category: 'Playlists',
    desc: 'Displays available playlists or requests your Playlist to the queue',
    example: 'playlist Chillstep -s'
};