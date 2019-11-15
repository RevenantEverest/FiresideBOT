const userPlaylistsController = require('../../controllers/dbControllers/userPlaylistsController');
const guildPlaylistController = require('../../controllers/dbControllers/guildPlaylistsController');


module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please enter a name for the new Playlist');
    if(args.includes("-s")) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
        args.splice(args.indexOf("-s"), 1);
        guildPlaylistController.getByGuildId(bot, message, "EditPlaylist", message.guild.id, handleGuildPlaylist, handleNoPlaylist);
    }
    else userPlaylistsController.getByDiscordId(bot, message, "EditPlaylist", message.author.id, handleUserPlaylist, handleNoPlaylist);
    
    async function handleUserPlaylist(uPlaylists) {
        let privacy = false;
        let playlist = uPlaylists.filter(el => el.name === args[1]);
        if(!playlist[0]) return message.channel.send("No Playlist Found");
        if(args.includes("-p")) privacy = true;
        if(!privacy) {
            if(uPlaylists.map(el => el.name).includes(args[2].toString())) return message.channel.send("No Duplicate Playlist Names");
            else if(args[3]) return message.channel.send('No white space allowed');
        }
        
        let data = {
            playlist_id: playlist[0].playlist_id, 
            discord_id: message.author.id, 
            name: (privacy ? playlist[0].name : args[2]), 
            public: (privacy ? !playlist[0].public : playlist[0].public)
        };

        userPlaylistsController.update(bot, message, "EditPlaylist", data, (newPlaylist) => {
            let updateText = `Playlist **${playlist[0].name}** changed to **${newPlaylist.name}**`
            if(privacy) updateText = `Playlist **${playlist[0].name}** is now **${newPlaylist.public ? 'Public' : 'Private'}**`
            return message.channel.send(updateText);
        });
    };

    async function handleGuildPlaylist(gPlaylists) {
        if(gPlaylists.includes(args[1].toString())) return message.channel.send("No Duplicate Playlist Names");
        else if(args[3]) return message.channel.send('No white space allowed');

        let playlist = gPlaylists.filter(el => el.name === args[1]);
        let data = {playlist_id: playlist[0].playlist_id, guild_id: message.guild.id, name: args[2], roles: playlist[0].roles};

        guildPlaylistController.update(bot, message, "EditPlaylist", data, (newPlaylist) => {
            return message.channel.send(`Playlist **${playlist[0].name}** changed to **${newPlaylist.name}**`);
        });
    };

    async function handleNoPlaylist() { return message.channel.send("No Playlist Found") }
};

module.exports.config = {
    name: 'editplaylist',
    d_name: 'EditPlaylist',
    aliases: ['ep'],
    params: { required: true, params: 'Playlist Name & New Playlist Name or `-p` Flag' },
    flags: ['-s', '-p'],
    category: 'Playlists',
    desc: 'Change the name of a Playlist',
    example: 'editplaylist Chillstep MyPlaylist'
};