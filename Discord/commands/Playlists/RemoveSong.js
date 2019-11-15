const userSongsController = require('../../controllers/dbControllers/userSongsController');
const guildSongsController = require('../../controllers/dbControllers/guildSongsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('Please specify a song ID');

    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        guildSongsController.getByPlaylistAndSongBySongId(bot, message, "RemoveSong", args[1], handleGuildSong, handleNoData);
    }
    else userSongsController.getByPlaylistAndSongBySongId(bot, message, "RemoveSong", args[1], handleUserSong, handleNoData);

    async function handleUserSong(song) {
        if(song.discord_id !== message.author.id) return message.channel.send('Invalid ID provided');
        userSongsController.delete(bot, message, "RemoveSong", song.song_id, () => {
            return message.channel.send(`**${song.title}** has been removed from playlist **${song.name}**`);
        });
    };

    async function handleGuildSong(song) {
        if(song.guild_id !== message.guild.id) return message.channel.send('Invalid ID provided');
        guildSongsController.delete(bot, message, "RemoveSong", song.song_id, () => {
            return message.channel.send(`**${song.title}** has been removed from server playlist **${song.name}**`);
        });
    };

    async function handleNoData() { return message.channel.send("Invalid ID Provided") }
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