const userPlaylistsController = require('../../controllers/dbControllers/userPlaylistsController');
const userSongsController = require('../../controllers/dbControllers/userSongsController');

const guildPlaylistsController = require('../../controllers/dbControllers/guildPlaylistsController');
const guildSongsController = require('../../controllers/dbControllers/guildSongsController');

const { strings, youtube } = require("../../utils");

async function checkForDuplicates(songs, info) {
    let arr = [];
    await songs.forEach(async el => {
        let video_id = await strings.filter(el.link, {special: false});
        arr.push(video_id);
    });

    let video_id = await strings.filter(info.link, {special: false});
    if(arr.includes(video_id)) return true;
    else return false;
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('Please specify a playlist to add to');
    if(!server.queue.isPlaying && !args[1]) return message.channel.send('Please specify a playlist and song to add');
    if(!server.queue.isPlaying && !args[2]) return message.channel.send('Please specify a song to add');

    const requestFilter = ['http://', 'https://', '\.com', 'watch\?v=', 'watch\?V=', 'youtube', 'www\.youtube', 'youtu\.be', '/'];
    let request = '';
    let playlistSearch = args[1];
    let guildPlaylist = false;
    let isLink = false;

    if(args[1] === "-s") playlistSearch = args[2];
    if(args.includes("-s")) {
        args.splice(args.indexOf("-s"), 1);
        guildPlaylist = true;
    }

    args.splice(1, 1);
    args.splice(0, 1);

    if(await strings.checkString(args[0], requestFilter)) {
        request = await strings.filter(args[0], { special: false });
        isLink = true;
    }
    else request = args.join(" ");
    
    if(server.queue.isPlaying && !args[0]) placeholder(server.queue.currentSongInfo);
    else youtube.youtubeSearch(message, args, server, request, { isLink: isLink }, (songInfo) => placeholder(songInfo));

    async function placeholder(info) {
        let playlist = null;
        if(guildPlaylist) {
            if(!server.premium && info.duration >= 600)
                return message.channel.send("Non premium playlists songs can't exceed 10 minutes");

            let data = { guild_id: message.guild.id, name: playlistSearch };
            guildPlaylistsController.getByGuildIdAndPlaylistName(bot, message, "AddSong", data, handleGuildPlaylist, handleNoPlaylist);
        }
        else {
            if(!userstate.premium && info.duration >= 600)
                return message.channel.send("Non premium playlists songs can't exceed 10 minutes");
                
            let data = { discord_id: message.author.id, name: playlistSearch };
            userPlaylistsController.getByDiscordIdAndPlaylistName(bot, message, "AddSong", data, handleUserPlaylist, handleNoPlaylist);
        }
    
        async function handleUserPlaylist(uPlaylist) {
            playlist = uPlaylist;
            userSongsController.getByPlaylistId(bot, message, "AddSong", playlist.playlist_id, async (songs) => {
                saveToUserPlaylist(playlist, songs, info)
            }, handleNoPlaylistSongs);
        };
    
        async function handleGuildPlaylist(gPlaylist) {
            playlist = gPlaylist
            guildSongsController.getByPlaylistId(bot, message, "AddSong", playlist.playlist_id, async (songs) => {
                saveToGuildPlaylist(playlist, songs, info)
            }, handleNoPlaylistSongs);
        };
    
        async function saveToUserPlaylist(playlist, songs, info) {
            let duplicate = await checkForDuplicates(songs, info);
            if(duplicate) return message.channel.send(`Song already exists in server playlist **${playlist.name}**`);
            let data = {
                playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail
            };
            userSongsController.save(bot, message, "AddSong", data, (song) => {
                return message.channel.send(`**${song.title}** added to playlist **${playlist.name}** with ID **${song.song_id}**`);
            });
        };
    
        async function saveToGuildPlaylist(playlist, songs, info) {
            let duplicate = await checkForDuplicates(songs, info);
            if(duplicate) return message.channel.send(`Song already exists in server playlist **${playlist.name}**`);
            let data = {
                playlist_id: playlist.playlist_id, title: info.title, link: info.link, author: info.author, duration: info.duration, thumbnail_url: info.thumbnail
            };
            guildSongsController.save(bot, message, "AddSong", data, (song) => {
                return message.channel.send(`**${song.title}** added to server playlist **${playlist.name}** with ID **${song.song_id}**`)
            });
        };

        async function handleNoPlaylist() { return message.channel.send(`No${guildPlaylist ? " Server " : " "}Playlist Found`); }
        async function handleNoPlaylistSongs() { guildPlaylist ? saveToGuildPlaylist(playlist, [], info) : saveToUserPlaylist(playlist, [], info); }
    };
};

module.exports.config = {
    name: 'addsong',
    d_name: 'AddSong',
    aliases: [],
    params: { required: true, params: 'Playlist Name and/or Song Request' },
    flags: ['-s'],
    category: 'Playlists',
    desc: 'Adds a song to your playlist from',
    example: 'addsong Chillstep Better Now Post Malone'
};
