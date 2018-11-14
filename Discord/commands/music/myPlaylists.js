const config = require('../../../config/config');
const userPlaylistsDB = require('../../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../../models/UserModels/userSongsDB');

module.exports = {
  findMyPlaylists(message, args, server) {
    userPlaylistsDB.findByDiscordId(message.author.id)
      .then(playlists => {
        let playlistEmbed = new config.Discord.RichEmbed();
        let playlistPromises = [];
        playlistEmbed
          .setTitle(`**Available Playlists For ${message.author.username}**`)
          .addBlankField()
          .setThumbnail('https://i.imgur.com/OpSJJxe.png')
          .setColor(0xff3399);
        for(let i = 0; i < playlists.length; i++) {
          playlistPromises.push(userSongsDB.findByPlaylistId(playlists[i].playlist_id));
        }
        Promise.all(playlistPromises).then(songs => {
          for(let i = 0; i < playlists.length; i++) {
            if(i > 20) return; // Adheres to 25 field limit for Rich Embeds
            playlistEmbed.addField(`${i + 1}. ${playlists[i].name}`, `${songs[i].length} Songs`)
          }
          return message.channel.send(playlistEmbed);
        })
        .catch(err => {
          if(err instanceof QRE && err.code === qrec.noData) {
          }
          else console.log(err);
        })
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          message.channel.send('No playlists available.');
        }
        else console.log(err);
      });
  }
}