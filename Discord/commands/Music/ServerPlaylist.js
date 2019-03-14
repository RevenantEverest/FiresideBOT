const guildPlaylistsDB = require('../../../models/GuildModels/guildPlaylistsDB');
const guildSongsDB = require('../../../models/GuildModels/guildSongsDB');
const playSong = require('../utils/playSong');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.voiceChannel) {
        message.channel.send("You must be in a voice channel");
        return;
      }
      if(!args[1]) {
        message.channel.send("No playlist name provided.");
        return;
      }
  
      // TODO: Handle Query Result Error 0
      console.log(message.guild.id);
      guildPlaylistsDB.findByGuildIdAndPlaylistName({ guild_id: message.guild.id, name: args[1] })
        .then(playlist => {
          console.log(playlist);
          guildSongsDB.findByPlaylistId(playlist.playlist_id)
            .then(songs => {
              console.log(songs);
              for(let i = 0; i < songs.length; i++) {
                server.queue.queueInfo.push({ title: songs[i].title, link: songs[i].link, requestedBy: message.author.username });
              }
              message.channel.send(`Adding server playlist ${playlist.name} to the queue.`);
              if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((connection) => {
                playSong.playSong(connection, message);
              })
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

module.exports.config = {
    name: 'serverplaylist',
    d_name: 'ServerPlaylist',
    aliases: [],
    params: { required: false, params: 'Playlist Name' },
    category: 'Music',
    desc: 'Mmm mmm good',
    example: 'serverplaylist MyFavoriteSongs'
};