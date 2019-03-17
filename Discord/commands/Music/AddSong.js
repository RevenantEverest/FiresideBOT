const userPlaylistsDB = require('../../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../../models/UserModels/userSongsDB');
const YTDL = require('ytdl-core');
const youtubeServices = require('../../../services/youtubeServices');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function youtubeSearch(message, args, songRequest, playlist) {
  youtubeServices.youtubeSearch(songRequest)
    .then(results => {
      if(results.data.items.length > 1) return message.channel.send("No results found");
      const link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
      YTDL_GetInfo(message, args, link, playlist);
    })
    .catch(err => {
      if(err.response.status === 400) {
        message.channel.send('Invalid Search Request');
        console.error(err)
      }
    })
}

async function YTDL_GetInfo(message, args, link, { playlist_id, name }) {
  YTDL.getInfo(link, (err, {title, author, length_seconds, thumbnail_url}) => {
    if(err) return message.channel.send("YTDL Get Info error.");
    if(title === undefined) return message.channel.send(`Can't read title of undefined`);
    if(length_seconds >= 600) return message.channel.send('Playlist Songs limited to 10 minutes');
    saveToPlaylist(message, name, {
      playlist_id: playlist_id, title: title, link: link, author: author.name, duration: length_seconds, thumbnail_url: thumbnail_url
    })
  })
}

async function saveToPlaylist(message, playlist_name, data) {
  userSongsDB.save(data) 
    .then(playlist => message.channel.send(`**${data.title}** added to playlist **${playlist_name}** with ID **${playlist.song_id}**`))
    .catch(err => {
      message.channel.send("Error saving to Playlist");
      console.error(err);
    });
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
  if(!args[1]) return message.channel.send('Please specify a playlist to add to');
  if(!server.queue.isPlaying && !args[1]) return message.channel.send('Please specify a playlist and song to add');
  if(!server.queue.isPlaying && !args[2]) return message.channel.send('Please specify a song to add');

  const requestFilter = ['http://', 'https://', '.com', 'watch?v=', 'youtube', 'www.youtube', 'youtu.be', '/'];
  let request = '';
  const playlistSearch = args[1];

  args.splice(1, 1);
  args.splice(0, 1);

  await utils.checkString(args[2], requestFilter) ? request = await utils.filter(args[2], requestFilter, { special: false }) : request = args.join(" ");

  userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: message.author.id, name: playlistSearch })
      .then(playlist => {
          if(playlist === null) return message.channel.send(`No playlist by that name found`);
          if(server.queue.isPlaying && !args[2]) {
              let info = server.queue.currentSongInfo;
              
              saveToPlaylist(message, playlist.name, {
                playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail 
              });
          }
          else
            youtubeSearch(message, args, request, playlist);
      })
      .catch(err => {
          if(err instanceof QRE && err.code === qrec.noData)
              return message.channel.send(`No playlist by that name found`);
          else console.log(err);
      });
};

module.exports.config = {
    name: 'addsong',
    d_name: 'AddSong',
    aliases: [],
    params: { required: true, params: 'Playlist Name and/or Song Request' },
    category: 'Music',
    desc: 'Adds a song to your playlist from',
    example: 'addsong Chillstep Better Now Post Malone'
};