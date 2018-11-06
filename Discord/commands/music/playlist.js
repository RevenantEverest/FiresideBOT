const config = require('../../../config/config');
const userPlaylistsDB = require('../../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../../models/UserModels/userSongsDB');
const playSong = require('./playSong');
const flags = require('../flags/flags');

module.exports = {
  playlist(message, args, server) {
    if(!message.member.voiceChannel) {
      message.channel.send("You must be in a voice channel");
      return;
    }
    if(!args[1]) {
      userPlaylistsDB.findByDiscordId(parseInt(message.author.id, 10))
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
        })
        .catch(err => console.log(err));
    }

    // TODO: Handle Query Result Error 0
    let playlistName = args[1];
    if(args[1] === "-s") playlistName = args[2];
    userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: parseInt(message.author.id, 10), name: playlistName })
      .then(playlist => {
        userSongsDB.findByPlaylistId(playlist.playlist_id)
          .then(songs => {
            for(let i = 0; i < songs.length; i++) {
              let queueInfo = {
                title: songs[i].title,
                link: songs[i].link,
                requestedBy: message.author.username
              }
              server.queue.queueInfo.push(queueInfo);
            }
            if(args.includes("-s")) flags.shuffle(server.queue.queueInfo);
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
