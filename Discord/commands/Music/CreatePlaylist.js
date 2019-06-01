const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function savePlaylist(args, message) {
    userPlaylistsDB.save({ discord_id: message.author.id, name: args[1].toString() })
    .then(savedPlaylist => {
        message.channel.send(`New playlist **${savedPlaylist.name}** created`);
    })
    .catch(err => console.log(err));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please enter a name for the new Playlist');
    if(args[2]) return message.channel.send('No white space allowed');

    userPlaylistsDB.findByDiscordId(message.author.id)
    .then(playlists => {
        if(playlists.length >= 5) return message.channel.send("Playlists limited to 5");
        savePlaylist(args, message);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            savePlaylist(args, message)
        else console.error(err);
    })
};

module.exports.config = {
    name: 'createplaylist',
    d_name: 'CreatePlaylist',
    aliases: ['cp'],
    params: { required: true, params: 'Name' },
    category: 'Music',
    desc: 'Create a playlist',
    example: 'createplaylist Lo-Fi'
}