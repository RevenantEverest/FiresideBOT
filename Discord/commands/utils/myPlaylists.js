const Discord = require('discord.js');
const userPlaylistsDB = require('../../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../../models/UserModels/userSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getPlaylistSongs(playlists) {
  let songData = [];
    for(let i = 0; i < playlists.length; i++) {
      await userSongsDB.findByPlaylistId(playlists[i].playlist_id)
              .then(songs => {
                songData.push(songs);
              })
              .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData) {
                  songData.push([]);
                }
                else console.log(err);
              })
    }
    return songData;
};

module.exports = {
    findMyPlaylists(message, args, server) {
        userPlaylistsDB.findByDiscordId(message.author.id)
          .then(playlists => {
            let playlistEmbed = new Discord.RichEmbed();
            let playlistPromises = [];
            playlistEmbed
              .setTitle(`**Available Playlists For ${message.author.username}**`)
              .addBlankField()
              .setThumbnail('https://i.imgur.com/OpSJJxe.png')
              .setColor(0xff3399);
            let songData = [];
            getPlaylistSongs(playlists).then(songs => {
              songData = songs;
              for(let i = 0; i < playlists.length; i++) {
                if(i > 20) return;
                playlistEmbed.addField(`${i + 1}. ${playlists[i].name}`, `${songData[i].length} Songs`)
              }
              return message.channel.send(playlistEmbed);
            })
            .catch(err => console.log(err));
          })
          .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) {
              message.channel.send('No playlists available.');
            }
            else console.log(err);
          });
      }
}