const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');

const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function deleteUserPlaylistSongs(playlist, message) {
    userSongsDB.deletePlaylistSongs(playlist.playlist_id)
    .then(() => message.channel.send(`Playlist **${playlist.name}** has been deleted`))
    .catch(err => console.error(err));
};

async function deleteGuildPlaylistSongs(playlist, message) {
    guildSongsDB.deletePlaylistSongs(playlist.playlist_id)
    .then(() => message.channel.send(`Server Playlist **${playlist.name}** has been deleted`))
    .catch(err => console.error(err));
}

async function deleteUserPlaylist(playlist, message) {
    userPlaylistsDB.delete(playlist.playlist_id)
    .then(() => deleteUserPlaylistSongs(playlist, message))
    .catch(err => console.error(err))
};

async function deleteGuildPlaylist(playlist, message) {
    guildPlaylistsDB.delete(playlist.playlist_id)
    .then(() => deleteGuildPlaylistSongs(playlist, message))
    .catch(err => console.error(err))
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify a Playlist to delete');
    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        guildPlaylistsDB.findByGuildIdAndPlaylistName({ guild_id: message.guild.id, name: args[1] })
        .then(playlist => deleteGuildPlaylist(playlist, message))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                message.channel.send(`No playlist by that name found`);
            else console.log(err);
        })
    }
    else {
        userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: message.author.id, name: args[1] })
        .then(playlist => deleteUserPlaylist(playlist, message))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                message.channel.send(`No playlist by that name found`);
            else console.log(err);
        })
    } 
};

module.exports.config = {
    name: 'deleteplaylist',
    d_name: 'DeletePlaylist',
    aliases: ['dp', 'delplaylist', 'delplay'],
    params: { required: true, params: 'Name' },
    category: 'Playlists',
    desc: 'Deletes a Playlist',
    example: 'deleteplaylist Lo-Fi'
};