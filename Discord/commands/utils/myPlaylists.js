const Discord = require('discord.js');
const userPlaylistsDB = require('../../models/UserModels/userPlaylistsDB');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const guildPlaylistsDB = require('../../models/GuildModels/guildPlaylistsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');
const utils = require('./utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getUserPlaylistSongs(playlists) {
  let songData = [];
  for(let i = 0; i < playlists.length; i++) {
    await userSongsDB.findByPlaylistId(playlists[i].playlist_id)
    .then(songs => songData.push(songs))
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        songData.push([]);
      else console.log(err);
    })
  }
  return songData;
}

async function getGuildPlaylistSongs(playlists) {
  let songData = [];
  for(let i = 0; i < playlists.length; i++) {
    await guildSongsDB.findByPlaylistId(playlists[i].playlist_id)
    .then(songs => songData.push(songs))
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        songData.push([]);
      else console.log(err);
    })
  }
  return songData;
}

async function handleEmbed(message, args, bot, discord_id, playlists, songData, guildPlaylist) {
  let embed = new Discord.RichEmbed();
  let totalLength = 0;
  let discordUser = bot.users.get(playlists[0].discord_id);
  [].concat.apply([], songData).forEach(el => totalLength += parseInt(el.duration, 10));
  totalLength = await utils.timeParser(totalLength);

  embed
  .addField(`Overall Playlist Length:`, `(${totalLength})`)
  .addBlankField()
  .setThumbnail('https://i.imgur.com/OpSJJxe.png')
  .setColor(0xff3399);

  if(args[0] === "serverplaylist" || args[0] === "sp")
    embed
    .setAuthor(`${message.guild.name}`, message.guild.iconURL);
  else
    embed
    .setAuthor(`${discordUser.username}#${discordUser.discriminator}`, `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=2048`)

  for(let i = 0; i < playlists.length; i++) {
    if(i > 20) return;
    if(!guildPlaylist && !playlists[i].public && discord_id !== message.author.id) continue;
    let overallLength = 0;
    songData[i].forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength);
    embed.addField(`${i + 1}. ${playlists[i].name} (${overallLength}) ${playlists[i].public ? "" : "*Private*" }`, `${songData[i].length} Songs`)
  }
  return message.channel.send(embed);
}

module.exports = {
  async findMyPlaylists(message, args, discord_id, bot) {
    userPlaylistsDB.findByDiscordId(discord_id)
    .then(playlists => {
      getUserPlaylistSongs(playlists)
      .then(songData => handleEmbed(message, args, bot, discord_id, playlists, songData, false))
      .catch(err => console.error(err));
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        message.channel.send(`No playlists found`);
      else console.log(err);
    })    
  },
  async findServerPlaylists(message, args, bot) {;
    guildPlaylistsDB.findByGuildId(message.guild.id)
    .then(playlists => {
      getGuildPlaylistSongs(playlists)
      .then(songData => handleEmbed(message, args, bot, message.author.id, playlists, songData, true))
      .catch(err => console.error(err));
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        message.channel.send(`No playlists found`);
      else console.log(err);
    })
  }
}