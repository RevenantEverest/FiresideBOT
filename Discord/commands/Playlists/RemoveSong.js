const userSongsDB = require('../../models/UserModels/userSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify a song ID');
    if(!parseInt(args[1], 10)) return message.channel.send('Please specify a valid numeric ID');

    userSongsDB.something(args[1])
        .then(results => {
            if(results.discord_id !== message.author.id) return message.channel.send('Invalid ID provided');
            else {
                userSongsDB.destroy(results.song_id)
                    .then(() => message.channel.send(`**${results.title}** has been removed from **${results.name}**`))
                    .catch(err => console.error(err));
            }
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                return message.channel.send('Invalid ID provided');
            else console.log(err);
        })
};

module.exports.config = {
    name: 'removesong',
    d_name: 'RemoveSong',
    aliases: [],
    params: { required: true, params: 'Name / ID' },
    category: 'Playlists',
    desc: 'Removes a song from a playlist',
    example: 'removesong 189'
};