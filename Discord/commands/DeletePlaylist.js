const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send('Please specify a Playlist to delete');
    userPlaylistsDB.findByDiscordIdAndPlaylistName({ discord_id: message.author.id, name: args[1] })
        .then(playlist => {
            if(playlist === null) return message.channel.send('No playlist by that name found')
            userPlaylistsDB.delete(playlist.playlist_id)
                .then(() => {
                    message.channel.send('Playlist `' + playlist.name + '` has been deleted')
                })
                .catch(err => {
                    console.error(err);
                })
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) {
                message.channel.send(`No playlist by that name found`);
            }
            else console.log(err);
        })
};

module.exports.config = {
    name: 'deleteplaylist',
    d_name: 'DeletePlaylist',
    aliases: ['dp', 'delplaylist', 'delplay'],
    params: { required: true, optional: false, params: 'Name' },
    category: ['music', 'Music'],
    desc: 'Deletes a Playlist'
};