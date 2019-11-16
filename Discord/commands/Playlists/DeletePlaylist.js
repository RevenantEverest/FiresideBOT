const userPlaylistsController = require('../../controllers/dbControllers/userPlaylistsController');
const guildPlaylistsController = require('../../controllers/dbControllers/guildPlaylistsController');

const userSongsController = require('../../controllers/dbControllers/userSongsController');
const guildSongsController = require('../../controllers/dbControllers/guildSongsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send('Please specify a Playlist to delete');
    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        let data = { guild_id: message.guild.id, name: args[1] };
        guildPlaylistsController.getByGuildIdAndPlaylistName(bot, message, "DeletePlaylist", data, handleGuildPlaylist, handleNoGuildPlaylist);
    }
    else {
        let data = { discord_id: message.author.id, name: args[1] };
        userPlaylistsController.getByDiscordIdAndPlaylistName(bot, message, "DeletePlaylist", data, handleUserPlaylist, handleNoUserPlaylist);
    } 

    async function handleUserPlaylist(playlist) {
        userSongsController.deletePlaylistSongs(bot, message, "DeletePlaylist", playlist.playlist_id, () => {
            userPlaylistsController.delete(bot, message, "DeletePlaylist", playlist.playlist_id, () => {
                return message.channel.send(`Playlist **${playlist.name}** has been deleted`);
            });
        });
    };

    async function handleGuildPlaylist(playlist) {
        guildSongsController.deletePlaylistSongs(bot, message, "DeletePlaylist", playlist.playlist_id, () => {
            guildPlaylistsController.delete(bot, message, "DeletePlaylist", playlist.playlist_id, () => {
                return message.channel.send(`Server Playlist **${playlist.name}** has been deleted`);
            });
        });
    };

    async function handleNoUserPlaylist() { return message.channel.send("No Playlist Found"); }
    async function handleNoGuildPlaylist() { return message.channel.send("No Server Playlist Found"); }
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