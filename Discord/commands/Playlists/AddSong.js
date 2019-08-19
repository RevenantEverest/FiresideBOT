const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');

const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');

const YTDL = require('ytdl-core');
const youtubeServices = require('../../services/youtubeServices');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function findUserPlaylist(args, message, server, guildPlaylist, playlistSearch, request) {
  userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: message.author.id, name: playlistSearch })
  .then(playlist => {
    if(server.queue.isPlaying && !args[2]) {
        let info = server.queue.currentSongInfo;
              
        saveToUserPlaylist(message, playlist.name, {
          playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail 
        });
    }
    else youtubeSearch(message, args, request, guildPlaylist, playlist);
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
        return message.channel.send(`No playlist by that name found`);
    else errorHandler(bot, message, err, "DB Error", "AddSong");
  });
}

async function findGuildPlaylist(args, message, server, guildPlaylist, playlistSearch, request) {
  guildPlaylistsDB.findByGuildIdAndPlaylistName({ guild_id: message.guild.id, name: playlistSearch })
  .then(playlist => {
    let hasPermission = false;
    if(playlist.roles) {
      message.member.roles.forEach((el, idx) => {
        if(playlist.roles.indexOf(el) !== -1) hasPermission = true; 
      })
    }
    if(message.member.hasPermission('ADMINISTRATOR')) hasPermission = true;
    if(!hasPermission) return message.channel.send(`You don't have permission to use this command`)
    if(server.queue.isPlaying && !args[2]) {
        let info = server.queue.currentSongInfo;
              
        getGuildPlaylistSongs(message, playlist, info);
    }
    else youtubeSearch(message, args, request, guildPlaylist, playlist);
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
        return message.channel.send(`No playlist by that name found`);
    else errorHandler(bot, message, err, "DB Error", "AddSong");
  });
}

async function getGuildPlaylistSongs(message, playlist, info) {
  guildSongsDB.findByPlaylistId(playlist.playlist_id)
  .then(async songs => {
    let duplicate = await checkForDuplicates(songs, info);
    if(duplicate) 
      return message.channel.send(`Song already exists in playlist **${playlist.name}**`);
    else 
      saveToGuildPlaylist(message, playlist.name, {
        playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail 
      });
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
      saveToGuildPlaylist(message, playlist.name, {
        playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail 
      });
    else errorHandler(bot, message, err, "DB Error", "AddSong");
  })
}

async function getUserPlaylistSongs(message, playlist, info) {
  userSongsDB.findByPlaylistId(playlist.playlist_id)
  .then(async songs => {
    let duplicate = await checkForDuplicates(songs, info);
    if(duplicate) 
      return message.channel.send(`Song already exists in playlist **${playlist.name}**`);
    else 
      saveToUserPlaylist(message, playlist.name, {
        playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail 
      });
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
      saveToUserPlaylist(message, playlist.name, {
        playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail 
      });
    else errorHandler(bot, message, err, "DB Error", "AddSong");
  })
}

async function checkForDuplicates(songs, info) {
  let arr = [];
  await songs.forEach(async el => {
    let video_id = await utils.filter(el.link, {special: false});
    arr.push(video_id);
  });
  
  let video_id = await utils.filter(info.link, {special: false});
  if(arr.includes(video_id)) return true;
  else return false;
}

async function saveToUserPlaylist(message, playlist_name, data) {
  userSongsDB.save(data) 
  .then(playlist => message.channel.send(`**${data.title}** added to playlist **${playlist_name}** with ID **${playlist.song_id}**`))
  .catch(err => errorHandler(bot, message, err, "Error Saving to Playlist", "AddSong"));
}

async function saveToGuildPlaylist(message, playlist_name, data) {
  guildSongsDB.save(data) 
  .then(playlist => message.channel.send(`**${data.title}** added to playlist **${playlist_name}** with ID **${playlist.song_id}**`))
  .catch(err => errorHandler(bot, message, err, "Error Saving to Playlist", "AddSong"));
}

async function youtubeSearch(message, args, songRequest, guildPlaylist, playlist) {
  youtubeServices.youtubeSearch(songRequest)
  .then(results => {
    if(results.data.items.length > 1) return message.channel.send("No results found");
    const link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
    YTDL_GetInfo(message, args, guildPlaylist, link, playlist);
  })
  .catch(err => {
    if(err.response.status === 400) errorHandler(bot, message, err, "Invalid Search Request", "AddSong");
  })
}

async function YTDL_GetInfo(message, args, guildPlaylist, link, playlist) {
  YTDL.getInfo(link, (err, info) => {
    if(err) return errorHandler(bot, message, err, "YTDL Error", "AddSong");
    if(info.title === undefined) return message.channel.send(`Can't read title of undefined`);
    if(info.length_seconds >= 600) return message.channel.send('Playlist Songs limited to 10 minutes');
    let thumbnails = info.player_response.videoDetails.thumbnail.thumbnails;
    let songInfo = { title: info.title, link: link, author: info.author.name, duration: info.length_seconds, thumbnail_url: thumbnails[thumbnails.length - 1].url };
    if(guildPlaylist) getGuildPlaylistSongs(message, playlist, songInfo) ;
    else getUserPlaylistSongs(message, playlist, songInfo);
  });
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
  if(!args[1]) return message.channel.send('Please specify a playlist to add to');
  if(!server.queue.isPlaying && !args[1]) return message.channel.send('Please specify a playlist and song to add');
  if(!server.queue.isPlaying && !args[2]) return message.channel.send('Please specify a song to add');

  let request = '';
  const requestFilter = ['http://', 'https://', '.com', 'watch?v=', 'youtube', 'www.youtube', 'youtu.be', '/'];
  let playlistSearch = args[1];
  let guildPlaylist = false;

  if(args[1] === "-s") playlistSearch = args[2];
  if(args.includes("-s")) {
    args.splice(args.indexOf("-s"), 1);
    guildPlaylist = true;
  }

  args.splice(1, 1);
  args.splice(0, 1);

  await utils.checkString(args[2], requestFilter) ? request = await utils.filter(args[2], { special: false }) : request = args.join(" ");

  if(guildPlaylist) findGuildPlaylist(args, message, server, guildPlaylist, playlistSearch, request);
  else findUserPlaylist(args, message, server, guildPlaylist, playlistSearch, request);
};

module.exports.config = {
    name: 'addsong',
    d_name: 'AddSong',
    aliases: [],
    params: { required: true, params: 'Playlist Name and/or Song Request' },
    flags: ['-s'],
    category: 'Playlists',
    desc: 'Adds a song to your playlist from',
    example: 'addsong Chillstep Better Now Post Malone'
};

// Check For Duplicate for User Playlist
// Fix Request 