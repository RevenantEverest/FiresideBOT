const likedSongsController = require('../../controllers/dbControllers/likedSongsController');
const viewPlaylist = require('../utils/viewPlaylist');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let playlistName = null;
    let discord_id = null;

    if(/<@?(\d+)>/.exec(args.join(" "))) discord_id = /<@?(\d+)>/.exec(args.join(" "))[1];
    else if(/<@!?(\d+)>/.exec(args.join(" "))) discord_id = /<@!?(\d+)>/.exec(args.join(" "))[1];

    if(discord_id) args.splice(1, 1);

    let playlistData = { discord_id: (discord_id ? discord_id : message.author.id), name: playlistName };
    playlistData.name = "LikedSongs (Default Playlist)";
    likedSongsController.getByDiscordId(bot, message, "Playlist", playlistData.discord_id, handleLikedSongs, handleNoLikedSongs);

    async function handleLikedSongs(likedSongs) {
        likedSongs.forEach(el => el.song_id = el.id);
        playlistData.songs = likedSongs;
        playlistData.public = true;
        viewPlaylist.viewUserPlaylist(message, playlistData.discord_id, playlistData, bot);
    };

    async function handleNoLikedSongs() { 
        return message.channel.send("No liked songs. Use the heart react on a current song to add to your Liked Songs playlist!"); 
    }

};

module.exports.config = {
    name: 'likedsongs',
    d_name: 'LikedSongs',
    aliases: ['playlists'],
    params: { required: false, params: '@User Tag' },
    category: 'Playlists',
    desc: 'Displays your LikedSongs playlist',
    example: 'likedsongs'
};