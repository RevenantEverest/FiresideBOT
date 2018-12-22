const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const playSong = require('./utils/playSong');
const myPlaylists = require('./utils/myPlaylists');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

function shuffle(arr) {
  for(let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!message.member.voiceChannel) {
        message.channel.send("You must be in a voice channel");
        return;
      }
      if(!args[1]) return myPlaylists.findMyPlaylists(message, args, server);
  
      let playlistName = args[1];
      if(args[1] === "-s") playlistName = args[2];
      userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: message.author.id, name: playlistName })
        .then(playlist => {
          if(!playlist) return message.channel.send('No playlist found by that name');
          userSongsDB.findByPlaylistId(playlist.playlist_id)
            .then(songs => {
              for(let i = 0; i < songs.length; i++) {
                let queueInfo = {
                  title: songs[i].title,
                  link: songs[i].link,
                  author: songs[i].author,
                  duration: songs[i].duration,
                  thumbnail: songs[i].thumbnail_url,
                  requestedBy: message.author.username
                }
                server.queue.queueInfo.push(queueInfo);
              }
              if(args.includes("-s")) shuffle(server.queue.queueInfo);
              message.channel.send(`Adding playlist ${playlist.name} to the queue.`);
              if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                playSong.playSong(connection, message);
              })
            })
            .catch(err => {
              if(err instanceof QRE && err.code === qrec.noData) {
                message.channel.send(`No songs found in playlist ${playlist.name}`);
              }
              else console.log(err);
            });
        })
        .catch(err => {
          if(err instanceof QRE && err.code === qrec.noData) {
            message.channel.send('No playlist found by that name');
          }
          else console.log(err);
        })
};

module.exports.config = {
    name: 'playlist',
    aliases: [],
    category: ['music', 'Music'],
    desc: ''
};