const userPlaylistsDB = require('../../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../../models/UserModels/userSongsDB');
const playSong = require('./playSong');

module.exports = {
  playlist(message, args, server) {
    if(!message.member.voiceChannel) {
      message.channel.send("You must be in a voice channel");
      return;
    }
    if(!args[1]) {
      message.channel.send("No playlist name provided.");
      return;
    }

    // TODO: Handle Query Result Error 0
    userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: parseInt(message.author.id, 10), name: args[1] })
      .then(playlist => {
        userSongsDB.findByPlaylistId(playlist.playlist_id)
          .then(songs => {
            for(let i = 0; i < songs.length; i++) {
              server.queue.titles.push(songs[i].title);
              server.queue.links.push(songs[i].link);
              server.queue.requestedBy.push(message.author.username);
            }
            message.channel.send(`Adding playlist ${playlist.name} to the queue.`);
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
              playSong.playSong(connection, message);
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
