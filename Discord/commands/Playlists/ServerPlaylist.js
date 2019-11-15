const playSong = require('../utils/playSong');
const utils = require('../utils/utils');
const myPlaylists = require('../utils/myPlaylists');
const viewPlaylist = require('../utils/viewPlaylist');

const guildPlaylistsController = require('../../controllers/dbControllers/guildPlaylistsController');
const guildSongsController = require('../../controllers/dbControllers/guildSongsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update");
    if(!args[1]) return myPlaylists.findServerPlaylists(message, args, bot);

    let playlistName = args[1];

    if(args[1] === "-i" || args[1] === "-s") playlistName = args[2];

    guildPlaylistsController.getByGuildIdAndPlaylistName(bot, message, "ServerPlaylist", { guild_id: message.guild.id, name: playlistName }, handleGuildPlaylist, handleNoPlaylist);

    async function handleGuildPlaylist(playlist) {
        if(args.includes("-i")) return viewPlaylist.viewGuildPlaylist(message, args, server, playlist, bot);
        if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
        guildSongsController.getByPlaylistId(bot, message, "ServerPlaylist", playlist.playlist_id, handleGuildSongs, handleNoSongs);
    };

    async function handleGuildSongs(songs) {
        if(args.includes("-s")) songs = await utils.shuffle(songs);
        songs.forEach(el => {
            server.queue.queueInfo.push({
                title: el.title, link: el.link, author: el.author, duration: el.duration, thumbnail: el.thumbnail_url,requestedBy: message.author.username
            });
        });
        message.channel.send(`Adding playlist **${playlistName}** to the queue`);
      
        if(!message.guild.voiceConnection) 
            message.member.voiceChannel.join()
            .then((connection) => playSong.playSong(bot, connection, message, server))
            .catch(err => console.error(err));
    };

    async function handleNoPlaylist() { return message.channel.send("No Server Playlist Found"); }
    async function handleNoSongs() { return message.channel.send(`No Songs Found For Server Playlist **${playlistName}**`); }
};

module.exports.config = {
    name: 'serverplaylist',
    d_name: 'ServerPlaylist',
    aliases: ['sp'],
    params: { required: false, params: 'Playlist Name' },
    flags: ['-i', '-s'],
    category: 'Playlists',
    desc: 'Display or request a server playlist to be added to the queue',
    example: 'serverplaylist MyFavoriteSongs'
};