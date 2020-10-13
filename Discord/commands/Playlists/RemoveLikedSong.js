const likedSongsController = require('../../controllers/dbControllers/likedSongsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('Please specify a liked song ID');

    likedSongsController.getByDiscordIdAndSongId(bot, message, "RemoveLikedSong", { discord_id: message.author.id, id: args[1] }, handleRemoveSong, handleNoData);

    async function handleRemoveSong(song) {
        likedSongsController.delete(bot, message, "RemoveLikedSong", song.id, () => {
            return message.channel.send(`**${song.title}** has been removed from playlist **LikedSongs (Default Playlist)**`);
        });
    };

    async function handleNoData() { return message.channel.send("Invalid ID Provided") }
};

module.exports.config = {
    name: 'removelikedsong',
    d_name: 'RemoveLikedSong',
    aliases: ['rls'],
    params: { required: true, params: 'ID' },
    category: 'Playlists',
    desc: 'Removes a liked song from the default LikedSongs playlist',
    example: 'removelikedsong 189'
};