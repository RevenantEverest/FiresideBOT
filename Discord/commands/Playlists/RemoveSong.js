const userSongsDB = require('../../models/UserModels/userSongsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function deleteUserSong(message, song) {
    if(song.discord_id !== message.author.id) return message.channel.send('Invalid ID provided');
    userSongsDB.destroy(song.song_id)
    .then(() => message.channel.send(`**${song.title}** has been removed from playlist **${song.name}**`))
    .catch(err => console.error(err));
}

async function deleteGuildSong(message, song) {
    if(song.guild_id !== message.guild.id) return message.channel.send('Invalid ID provided');
    guildSongsDB.destroy(song.song_id)
    .then(() => message.channel.send(`**${song.title}** has been removed from server playlist **${song.name}**`))
    .catch(err => console.error(err));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify a song ID');

    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        guildSongsDB.findPlaylistAndSongBySongId(args[1])
        .then(song => deleteGuildSong(message, song))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                return message.channel.send('Invalid ID provided');
            else console.error(err);
        })
    }
    else {
        userSongsDB.findPlaylistAndSongBySongId(args[1])
        .then(song => deleteUserSong(message, song))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                return message.channel.send('Invalid ID provided');
            else console.error(err);
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