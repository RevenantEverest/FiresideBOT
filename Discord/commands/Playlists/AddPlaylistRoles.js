const guildPlaylistController = require('../../controllers/dbControllers/guildPlaylistsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a role and give a Server Playlist name")

    let role_id = null;
    if(args.includes("@everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Invalid Role ID Format");

    args.splice(args.indexOf(`<@&${role_id}>`), 1);

    guildPlaylistController.getByGuildIdAndPlaylistName(bot, message, "AddPlaylistRoles", { guild_id: message.guild.id, name: args[1] }, handlePlaylist, handleNoPlaylist);

    async function handlePlaylist(playlist) {
        let roles = playlist.roles
        if(playlist.roles) {
            if(playlist.roles.length >= 5) return message.channel.send("Only 5 Roles allowed per playlist");
            if(playlist.roles.includes(role_id)) return message.channel.send(`Role already exists for server playlist ${playlist.name}`)
            playlist.roles.push(role_id);
        }
        if(!playlist.roles) roles = [role_id];

        let data = { guild_id: message.guild.id, playlist_id: playlist.playlist_id, name: playlist.name, roles: roles };
        guildPlaylistController.update(bot, message, "AddPlaylistRoles", data, () => {
            return message.channel.send(`Users with the role <@&${role_id}> can now add songs to Server Playlist **${playlist.name}**`);
        });
    };

    async function handleNoPlaylist() { return message.channel.send("No Playlist Found"); }
};

module.exports.config = {
    name: 'addplaylistroles',
    d_name: 'AddPlaylistRoles',
    aliases: ['apr'],
    params: { required: true, params: 'Playlist Name & @Role Tag' },
    category: 'Playlists',
    desc: 'Roles added to a server playlist, will allow members with that role to add songs to that playlist',
    example: 'addplaylistroles Metal @Users'
};