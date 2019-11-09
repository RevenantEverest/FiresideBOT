const userController = require('../../controllers/dbControllers/userPlaylistsController');
const guildController = require('../../controllers/dbControllers/guildPlaylistsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please enter a name for the new Playlist');
    if(args[2] && !args.includes("-s")) return message.channel.send("No White Space Allowed");

    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        guildController.getByGuildId(bot, message, "CreatePlaylist", message.guild.id, handleGuildPlaylist, handleNoGuildPlaylists);
    }
    else userController.getByDiscordId(bot, message, "CreatePlaylist", message.author.id, handleUserPlaylist, handleNoUserPlaylists);

    async function handleUserPlaylist(playlists) {
        if(playlists.length >= 5) return message.channel.send("Playlists limited to 5");
        if(playlists.map(el => el.name).includes(args[1].toString())) return message.channel.send("No Duplicate Playlist Names");
        else userController.save(bot, message, "CreatePlaylist", { name: args[1], discord_id: message.author.id, public: true }, (playlist) => {
            message.channel.send(`New playlist **${playlist.name}** created`);
        });
    };

    async function handleGuildPlaylist(playlists) {
        if(playlists.length >= 1) return message.channel.send("Server Playlists limited to 1");
        if(playlists.map(el => el.name).includes(args[1].toString())) return message.channel.send("No Duplicate Playlist Names");
        else guildController.save(bot, message, "CreatePlaylist", { guild_id: message.guild.id, name: args[1] }, (playlist) => {
            message.channel.send(`New server playlist **${playlist.name}** created`);
        });
    };

    async function handleNoUserPlaylists() { handleUserPlaylist([]) };
    async function handleNoGuildPlaylists() { handleGuildPlaylist([]) };
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
};