const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function updatePlaylistRoles(message, playlist, role_id) {
    if(!playlist.roles) return message.channel.send("No Roles added to this Playlist");
    if(!playlist.roles.includes(role_id)) return message.channel.send('That role is not added to the Playlist');
    playlist.roles.splice(playlist.roles.indexOf(role_id), 1);
    let roles = playlist.roles;
    guildPlaylistsDB.update({ guild_id: message.guild.id, playlist_id: playlist.playlist_id, name: playlist.name, roles: roles })
    .then(() => message.channel.send(`Role <@&${role_id}> removed from Server Playlist **${playlist.name}**. Members with this role no longer can add songs to the playlist`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Roles", "RemovePlaylistRoles"));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a role and give a Server Playlist name")

    let role_id = null;
    if(args.includes("@everyone")) role_id = "@everyone";
    else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Invalid Role ID");

    args.splice(args.indexOf(`<@&${role_id}>`), 1);

    guildPlaylistsDB.findByGuildIdAndPlaylistName({ guild_id: message.guild.id, name: args[1] })
    .then(playlist => updatePlaylistRoles(message, playlist, role_id.toString()))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No Playlist found by that name");
        else errorHandler(bot, message, err, "DB Error", "RemovePlaylistRoles");
    })
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