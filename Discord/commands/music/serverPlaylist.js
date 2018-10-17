const guildPlaylistsDB = require('../../../models/GuildModels/guildPlaylistsDB');
const guildSongsDB = require('../../../models/GuildModels/guildSongsDB');
const playSong = require('./playSong');

module.exports = {
  serverPlaylist(message, args, server) {
    if(!message.member.voiceChannel) {
      message.channel.send("You must be in a voice channel");
      return;
    }
    if(!args[1]) {
      message.channel.send("No playlist name provided.");
      return;
    }

    // TODO: Handle Query Result Error 0
    guildPlaylistsDB.findByGuildIdAndPlaylistName({ guild_id: message.guild.id, name: args[1] })
      .then(playlist => {
        guildSongsDB.findByPlaylistId(playlist.playlist_id)
          .then(songs => {
            for(let i = 0; i < songs.length; i++) {
              server.queue.titles.push(songs[i].title);
              server.queue.links.push(songs[i].link);
            }
            message.channel.send(`Adding server playlist ${playlist.name} to the queue.`);
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
              playSong.playSong(connection, message);
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
