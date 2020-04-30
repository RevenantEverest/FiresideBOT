const playSong = require('../utils/playSong');
const myPlaylists = require('../utils/myPlaylists');
const viewPlaylist = require('../utils/viewPlaylist');
const utils = require('../utils/utils');

const userPlaylistsController = require('../../controllers/dbControllers/userPlaylistsController');
const userSongsController = require('../../controllers/dbControllers/userSongsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return myPlaylists.findMyPlaylists(message, args, message.author.id, bot);
  
    let playlistName = null;
    let discord_id = null;

    if(/<@?(\d+)>/.exec(args.join(" "))) discord_id = /<@?(\d+)>/.exec(args.join(" "))[1];
    else if(/<@!?(\d+)>/.exec(args.join(" "))) discord_id = /<@!?(\d+)>/.exec(args.join(" "))[1];

    if(discord_id) {
        args.splice(1, 1);
        if(!args.includes("-i") && !args[1]) return myPlaylists.findMyPlaylists(message, args, discord_id, bot);
    }

    playlistName = args[1] === "-s" || args[1] === '-i' ? args[2] : args[1];

    let playlistData = { discord_id: (discord_id ? discord_id : message.author.id), name: playlistName }
    userPlaylistsController.getByDiscordIdAndPlaylistName(bot, message, "Playlist", playlistData, handleUserPlaylists, handleNoPlaylist);

    async function handleUserPlaylists(playlist) {
        if(discord_id && !playlist.public && discord_id !== message.author.id) return message.channel.send("That users playlist is **Private**");
        if(args.includes("-i")) return viewPlaylist.viewUserPlaylist(message, (discord_id ? discord_id : message.author.id), playlist, bot);
        if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update");
        if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
        userSongsController.getByPlaylistId(bot, message, "Playlist", playlist.playlist_id, handleUserSongs, handleNoSongs);
    };

    async function handleUserSongs(songs) {
        if(args.includes("-s")) songs = await utils.shuffle(songs);
        songs.forEach((el, idx) => {
            server.queue.queueInfo.push({
                title: el.title, link: el.link, author: el.author, duration: el.duration, thumbnail: el.thumbnail_url, requestedBy: message.author
            });

            if(idx === (songs.length - 1)) {
            message.channel.send(`Adding playlist **${playlistName}** to the queue`);
            if(!message.guild.voiceConnection) 
                message.member.voiceChannel.join()
                .then(connection => playSong.playSong(bot, connection, message, server))
                .catch(err => console.error(err));
            }
            else if(message.guild.voiceConnection && !server.queue.isPlaying)
                return playSong.playSong(bot, server.queue.connection, message, server);
        })
    };

    async function handleNoPlaylist() { return message.channel.send("No Playlist Found"); }
    async function handleNoSongs() { return message.channel.send(`No songs found in playlist **${playlistName}**`); }
};

module.exports.config = {
    name: 'playlist',
    d_name: 'Playlist',
    aliases: ['playlists'],
    params: { required: false, params: 'Playlist Name' },
    flags: ['-i', '-s'],
    category: 'Playlists',
    desc: 'Displays available playlists or requests your Playlist to the queue',
    example: 'playlist Chillstep -s'
};