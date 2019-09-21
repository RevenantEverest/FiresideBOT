const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');
const playSong = require('../utils/playSong');
const utils = require('../utils/utils');
const myPlaylists = require('../utils/myPlaylists');
const viewPlaylist = require('../utils/viewPlaylist');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function getSongs(bot, args, message, server, playlist) {
  guildSongsDB.findByPlaylistId(playlist.playlist_id)
  .then(songs => addToQueue(bot, args, message, server, playlist, songs))
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
      message.channel.send(`No songs found in playlist **${playlist.name}**`);
    else errorHandler(bot, message, err, "DB Error", "ServerPlaylist");
  })
}

async function addToQueue(bot, args, message, server, playlist, songs) {
  if(args.includes("-s")) songs = await utils.shuffle(songs);
  songs.forEach(el => {
    server.queue.queueInfo.push({
      title: el.title, link: el.link, author: el.author, duration: el.duration, thumbnail: el.thumbnail_url,requestedBy: message.author.username
    })
  })
  message.channel.send(`Adding playlist **${playlist.name}** to the queue`);

  if(!message.guild.voiceConnection) message.member.voiceChannel.join()
    .then((connection) => {
        playSong.playSong(bot, connection, message, server);
    })
    .catch(err => console.error(err));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
  if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update");
  if(!args[1]) return myPlaylists.findServerPlaylists(message, args, bot);
  

  let playlistName = args[1];

  if(args[1] === "-i" || args[1] === "-s") playlistName = args[2];

  guildPlaylistsDB.findByGuildIdAndPlaylistName({ guild_id: message.guild.id, name: playlistName })
  .then(playlist => {
    if(args.includes("-i")) return viewPlaylist.viewGuildPlaylist(message, args, server, playlist, bot);
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    getSongs(bot, args, message, server, playlist)
  })
  .catch(err => {
    if(err instanceof QRE && err.code === qrec.noData)
      message.channel.send('No playlist found by that name');
    else errorHandler(bot, message, err, "DB Error", "ServerPlaylist");
  })
};

module.exports.config = {
    name: 'serverplaylist',
    d_name: 'ServerPlaylist',
    aliases: ['sp'],
    params: { required: false, params: 'Playlist Name' },
    flags: ['-i', '-s'],
    category: 'Playlists',
    desc: 'Display or request a server playlist to be added to the queue',
    example: 'serverplaylist MyFavoriteSongs'
};