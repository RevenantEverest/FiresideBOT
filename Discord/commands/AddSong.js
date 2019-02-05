const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const YTDL = require('ytdl-core');
const youtubeServices = require('../../services/youtubeServices');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

function YTDL_GetInfo(message, args, songRequest, playlist) {
    YTDL.getInfo(songRequest, (err, info) => {
      if(err) return message.channel.send("YTDL Get Info error.");
      if(info.title === undefined) return message.channel.send(`Can't read title of undefined`);
      if(info.length_seconds >= 600) return message.channel.send('Playlist Songs limited to 10 minutes');
      let data = {
        playlist_id: playlist.playlist_id,
        title: info.title,
        link: args[1],
        author: info.author.name,
        duration: info.length_seconds,
        thumbnail_url: info.thumbnail_url
      };

      // Save to Playlist
      userSongsDB.save(data)
        .then(() => message.channel.send('`' + data.title + '` added to playlist `' + playlist.name + '`'))
        .catch(err => console.error(err));
    });
  };
  
  function youtubeSearch(message, args, songRequest, playlist) {
    youtubeServices.youtubeSearch(songRequest)
      .then(results => {
        if(results.data.items[0] === undefined) return message.channel.send("An error has occured");
        YTDL.getInfo(`https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`, (err, info) => {
          if(err) message.channel.send('YTDL Get Info error');
          if(info === undefined) return message.channel.send("An Error has occured, sorry for the inconvenience.");
          if(info.length_seconds >= 600) return message.channel.send('Playlist Songs limited to 10 minutes');
          let data = {
            playlist_id: playlist.playlist_id,
            title: results.data.items[0].snippet.title,
            link: `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`,
            author: info.author.name,
            duration: info.length_seconds,
            thumbnail_url: info.thumbnail_url
          };

          //Save to Playlist
          userSongsDB.save(data)
            .then(() => message.channel.send('`' + data.title + '` added to playlist `' + playlist.name + '`'))
            .catch(err => console.error(err));
        })
      })
      .catch(err => {
        if(err.response.status === 400) {
          message.channel.send('Invalid Search Request');
          console.log(err)
        }
      });
  }

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send('Please specify a playlist to add to');
    if(!server.queue.isPlaying && !args[1]) return message.channel.send('Please specify a playlist and song to add');
    if(!server.queue.isPlaying && !args[2]) return message.channel.send('Please specify a song to add');

    userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: message.author.id, name: args[1] })
        .then(playlist => {
            if(playlist === null) return message.channel.send(`No playlist by that name found`);

            if(server.queue.isPlaying && !args[2]) {
                let info = server.queue.currentSongInfo;
                return userSongsDB.save({ playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail_url })
                            .then(() => message.channel.send('`' + info.title + '` added to playlist `' + playlist.name + '`'))
                            .catch(err => console.error(err));
            }

            let songRequest = `${args[2]}`;
            if(args[2].includes("http")) {
                if(args[2].includes('https://youtube.com') || args[2].includes("https://www.youtube.com") || args[2].includes('http://youtube.com'))
                    YTDL_GetInfo(message, args, songRequest, playlist);
                else return message.channel.send("You can only add YouTube links");
            }
            else {
                songRequest = '';
                for(let i = 1; i < args.length; i++ ) {
                    if(i === 1) continue;
                    songRequest += (args[i] + ' '); 
                }
                youtubeSearch(message, args, songRequest, playlist);
            }
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                return message.channel.send(`No playlist by that name found`);
            else console.log(err);
        })

};

module.exports.config = {
    name: 'addsong',
    d_name: 'AddSong',
    aliases: [],
    params: { required: true, optional: false, params: 'Song Request' },
    category: ['music', 'Music'],
    desc: 'Adds a song to your playlist from'
}