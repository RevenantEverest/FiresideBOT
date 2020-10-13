const Discord = require('discord.js');
const utils = require('./utils');

const userPlaylistsController = require('../../controllers/dbControllers/userPlaylistsController');
const userSongsController = require('../../controllers/dbControllers/userSongsController');
const likedSongsController = require('../../controllers/dbControllers/likedSongsController');

const guildPlaylistsController = require('../../controllers/dbControllers/guildPlaylistsController');
const guildSongsController = require('../../controllers/dbControllers/guildSongsController');

async function handleEmbed(message, args, bot, discord_id, playlists, songData, guildPlaylist) {
    let embed = new Discord.MessageEmbed();
    let totalLength = 0;
    let discordUser = bot.users.resolve(playlists[0].discord_id);
    [].concat.apply([], songData).forEach(el => totalLength += parseInt(el.duration, 10));
    totalLength = await utils.timeParser(totalLength);

    embed
    .addField(`Overall Playlist Length:`, `(${totalLength})`)
    .setThumbnail('https://i.imgur.com/OpSJJxe.png')
    .setColor(0xff3399);

    if(args[0] === "serverplaylist" || args[0] === "sp")
        embed.setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }));
    else
        embed
        .setAuthor(`${discordUser.username}#${discordUser.discriminator}`, `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=2048`)

    for(let i = 0; i < playlists.length; i++) {
        if(i > 20) return;
        if(!guildPlaylist && !playlists[i].public && discord_id !== message.author.id) continue;
        let overallLength = 0;
        songData[i] ? songData[i].forEach(el => overallLength += parseInt(el.duration, 10)) : overallLength += 0;
        overallLength = await utils.timeParser(overallLength);
        embed.addField(`${i + 1}. ${playlists[i].name} (${overallLength}) ${playlists[i].public ? "" : `<:Locked:624341962358652958>*Private*` }`, `${songData[i].length} Songs`)
    }
  return message.channel.send(embed);
}

module.exports = {
  async findMyPlaylists(message, args, discord_id, bot) { 
    userPlaylistsController.getByDiscordId(bot, message, "MyPlaylists", discord_id, getPlaylistSongs, () => {
        return message.channel.send("No Playlists Found");
    });

    async function getPlaylistSongs(playlists) {
        let songData = [];
        playlists.forEach((el, idx) => {
            userSongsController.getByPlaylistId(bot, message, "MyPlaylists", el.playlist_id, (songs) => {
                songData.push(songs);
                if((idx + 1) === playlists.length) return handleLikedSongs(playlists, songData);
            }, () => {
                songData.push([]);
                if((idx + 1) === playlists.length) return handleLikedSongs(playlists, songData);
            });
        });
    };

    async function handleLikedSongs(playlists, songData) {
        likedSongsController.getByDiscordId(bot, message, "MyPlaylists", discord_id, (likedSongs) => {
            playlists.push({ playlist_id: discord_id, discord_id: discord_id, name: "LikedSongs (Default Playlist)", public: true });
            for(let i = 0; i < likedSongs.length; i++) {
                likedSongs[i].playlist_id = discord_id;
            }
            songData.push(likedSongs);
            handleEmbed(message, args, bot, discord_id, playlists, songData, false);
        }, handleNoLikedSongs);
    };

    async function handleNoLikedSongs() {
        handleEmbed(message, args, bot, discord_id, playlists, songData, false);
    };
  },
  async findServerPlaylists(message, args, bot) {
    guildPlaylistsController.getByGuildId(bot, message, "MyPlaylists", message.guild.id, getPlaylistSongs, () => {
        return message.channel.send("No Playlists Found");
    });

    async function getPlaylistSongs(playlists) {
        let songData = [];
        playlists.forEach((el, idx) => {
            guildSongsController.getByPlaylistId(bot, message, "MyPlaylists", el.playlist_id, (songs) => {
                songData.push(songs);
                if((idx + 1) === playlists.length) return handleEmbed(message, args, bot, message.author.id, playlists, songData, true);
            }, () => {
                songData.push([]);
                if((idx + 1) === playlists.length) return handleEmbed(message, args, bot, message.author.id, playlists, songData, true);
            });
        });
    };
  }
}