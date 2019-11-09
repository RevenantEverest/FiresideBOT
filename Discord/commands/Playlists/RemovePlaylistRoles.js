const guildPlaylistsController = require('../../controllers/dbControllers/guildPlaylistsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a role and give a Server Playlist name")

    let role_id = null;
    if(args.includes("@everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Invalid Role ID");

    args.splice(args.indexOf(`<@&${role_id}>`), 1);

    guildPlaylistsController.getByGuildIdAndPlaylistName(bot, message, "RemovePlaylistRoles", { guild_id: message.guild.id, name: args[1] }, handleGuildPlaylist, handleNoPlaylist);

    async function handleGuildPlaylist(playlist) {
        if(!playlist.roles) return message.channel.send("No Roles added to this Playlist");
        if(!playlist.roles.includes(role_id)) return message.channel.send('That role is not added to the Playlist');
        playlist.roles.splice(playlist.roles.indexOf(role_id), 1);
        let roles = playlist.roles;
        let data = { guild_id: message.guild.id, playlist_id: playlist.playlist_id, name: playlist.name, roles: roles };
        guildPlaylistsController.update(bot, message, "RemovePlaylistRoles", data, () => {
            return message.channel.send(`Role <@&${role_id}> removed from Server Playlist **${playlist.name}**. Members with this role no longer can add songs to the playlist`);
        })
    };

    async function handleNoPlaylist() { return message.channel.send("No Playlist Found"); }
};

module.exports.config = {
    name: 'removeplaylistroles',
    d_name: 'RemovePlaylistRoles',
    aliases: ['rpr'],
    params: { required: true, params: 'Playlist Name & @Role Tag' },
    category: 'Playlists',
    desc: 'Removes roles added to a server playlist, will no longer allow members with that role to add songs to that playlist',
    example: 'removeplaylistroles Metal @Users'
};