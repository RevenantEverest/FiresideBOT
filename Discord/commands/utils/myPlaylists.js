const Discord = require('discord.js');
const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const utils = require('./utils');

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
    async findMyPlaylists(message, args, server) {
        userPlaylistsDB.findByDiscordId(message.author.id)
          .then(playlists => {
            let playlistEmbed = new Discord.RichEmbed();
            let playlistPromises = [];
            let songData = [];
            getPlaylistSongs(playlists).then(async songs => {
              songData = songs;
              let totalLength = 0;
              [].concat.apply([], songData).forEach(el => totalLength += parseInt(el.duration, 10));
              totalLength = await utils.timeParser(totalLength);

              playlistEmbed
              .setTitle(`Available Playlists For **${message.author.username}** (${totalLength})`)
              .addBlankField()
              .setThumbnail('https://i.imgur.com/OpSJJxe.png')
              .setColor(0xff3399);

              for(let i = 0; i < playlists.length; i++) {
                if(i > 20) return;
                let overallLength = 0;
                songData[i].forEach(el => overallLength += parseInt(el.duration, 10));
                overallLength = await utils.timeParser(overallLength);
                playlistEmbed.addField(`${i + 1}. ${playlists[i].name} (${overallLength})`, `${songData[i].length} Songs`)
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