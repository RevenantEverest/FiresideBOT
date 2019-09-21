const userSongsDB = require('../../models/UserModels/userSongsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function deleteUserSong(bot, message, song) {
    if(song.discord_id !== message.author.id) return message.channel.send('Invalid ID provided');
    userSongsDB.destroy(song.song_id)
    .then(() => message.channel.send(`**${song.title}** has been removed from playlist **${song.name}**`))
    .catch(err => errorHandler(bot, message, err, "Error Deleting Song", "RemoveSong"));
}

async function deleteGuildSong(bot, message, song) {
    if(song.guild_id !== message.guild.id) return message.channel.send('Invalid ID provided');
    guildSongsDB.destroy(song.song_id)
    .then(() => message.channel.send(`**${song.title}** has been removed from server playlist **${song.name}**`))
    .catch(err => errorHandler(bot, message, err, "Error Deleting Song", "RemoveSong"));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify a song ID');

    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        guildSongsDB.findPlaylistAndSongBySongId(args[1])
        .then(song => deleteGuildSong(bot, message, song))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                return message.channel.send('Invalid ID provided');
            else errorHandler(bot, message, err, "DB Error", "RemoveSong");
        })
    }
    else {
        userSongsDB.findPlaylistAndSongBySongId(args[1])
        .then(song => deleteUserSong(bot, message, song))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                return message.channel.send('Invalid ID provided');
            else errorHandler(bot, message, err, "DB Error", "RemoveSong");
        })
    }
};

module.exports.config = {
    name: 'removesong',
    d_name: 'RemoveSong',
    aliases: ['rs'],
    params: { required: true, params: 'Name / ID' },
    category: 'Playlists',
    desc: 'Removes a song from a playlist',
    example: 'removesong 189'
};