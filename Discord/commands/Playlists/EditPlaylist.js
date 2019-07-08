const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function findUserPlaylists(args, message, privacy) {
    userPlaylistsDB.findByDiscordId(message.author.id)
    .then(playlists => {
        let playlist = playlists.filter(el => el.name === args[1]);
        if(privacy) return updateUserPlaylist(args, message, playlist[0], privacy);
        if(playlists.includes(args[2].toString())) return message.channel.send("No Duplicate Playlist Names");
        else if(args[3]) return message.channel.send('No white space allowed');
        else updateUserPlaylist(args, message, playlist[0]);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            return message.channel.send("No Playlist Found");
        else console.error(err);
    })
}

async function findGuildPlaylists(args, message) {
    guildPlaylistsDB.findByGuildId(message.guild.id)
    .then(playlists => {
        if(playlists.includes(args[1].toString())) return message.channel.send("No Duplicate Playlist Names");
        else if(args[3]) return message.channel.send('No white space allowed');
        else {
            let playlist = playlists.filter(el => el.name === args[1]);
            updateGuildPlaylist(args, message, playlist[0]);
        }
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            return message.channel.send("No Playlist Found");
        else console.error(err);
    })
}

async function updateUserPlaylist(args, message, playlist, privacy) {
    userPlaylistsDB.update({playlist_id: playlist.playlist_id, discord_id: message.author.id, name: (privacy ? playlist.name : args[2]), public: (privacy ? !playlist.public : playlist.public)})
    .then(uPlaylist => {
        let updateText = `Playlist **${playlist.name}** changed to **${uPlaylist.name}**`
        if(privacy) updateText = `Playlist **${playlist.name}** is now **${uPlaylist.public ? 'Public' : 'Private'}**`
        message.channel.send(updateText);
    })
    .catch(err => console.error(err));
}

async function updateGuildPlaylist(args, message, playlist) {
    guildPlaylistsDB.update({playlist_id: playlist.playlist_id, guild_id: message.guild.id, name: args[2], roles: playlist.roles})
    .then(uPlaylist => message.channel.send(`Playlist **${playlist.name}** changed to **${uPlaylist.name}**`))
    .catch(err => console.error(err));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please enter a name for the new Playlist');
    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        findGuildPlaylists(args, message);
    }
    else if(args.includes("-p")) findUserPlaylists(args, message, true);
    else findUserPlaylists(args, message, false);
};

module.exports.config = {
    name: 'editplaylist',
    d_name: 'EditPlaylist',
    aliases: ['ep'],
    params: { required: true, params: 'Playlist Name & New Playlist Name or `-p` Flag' },
    flags: ['-s', '-p'],
    category: 'Playlists',
    desc: 'Change the name of a Playlist',
    example: 'editplaylist Chillstep MyPlaylist'
};