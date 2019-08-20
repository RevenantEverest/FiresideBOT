const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function saveUserPlaylist(bot, args, message) {
    userPlaylistsDB.save({ discord_id: message.author.id, name: args[1].toString(), public: true })
    .then(savedPlaylist => message.channel.send(`New playlist **${savedPlaylist.name}** created`))
    .catch(err => errorHandler(bot, message, err, "Error Saving Playlist", "CreatePlaylist"));
}

async function saveGuildPlaylist(bot, args, message) {
    guildPlaylistsDB.save({ guild_id: message.guild.id, name: args[1].toString() })
    .then(playlist => message.channel.send(`New Server playlist **${playlist.name}** created`))
    .catch(err => errorHandler(bot, message, err, "Error Saving Playlist", "CreatePlaylist"));
}

async function findUserPlaylists(bot, args, message) {
    if(args[2]) return message.channel.send("No White Space Allowed");

    userPlaylistsDB.findByDiscordId(message.author.id)
    .then(playlists => {
        if(playlists.length >= 5) return message.channel.send("Playlists limited to 5");
        if(playlists.includes(args[1].toString())) return message.channel.send("No Duplicate Playlist Names");
        else saveUserPlaylist(bot, args, message);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            saveUserPlaylist(bot, args, message)
        else errorHandler(bot, message, err, "DB Error", "CreatePlaylist");
    })
}

async function findGuildPlaylists(bot, args, message) {
    if(args[2]) return message.channel.send("No White Space Allowed")

    guildPlaylistsDB.findByGuildId(message.guild.id)
    .then(playlists => {
        if(playlists.length >= 1) return message.channel.send("Server Playlists limited to 1");
        if(playlists.includes(args[1].toString())) return message.channel.send("No Duplicate Playlist Names");
        else saveGuildPlaylist(bot, args, message);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            saveGuildPlaylist(bot, args, message)
        else errorHandler(bot, message, err, "Error Saving Playlist", "CreatePlaylist");
    })
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please enter a name for the new Playlist');

    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        findGuildPlaylists(bot, args, message);
    }
    else findUserPlaylists(bot, args, message);
};

module.exports.config = {
    name: 'createplaylist',
    d_name: 'CreatePlaylist',
    aliases: ['cp'],
    params: { required: true, params: 'Name' },
    flags: ['-s'],
    category: 'Playlists',
    desc: 'Create a playlist',
    example: 'createplaylist Lo-Fi'
}