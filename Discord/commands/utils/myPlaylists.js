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

async function handleEmbed(message, args, playlists, songData) {
  let embed = new Discord.RichEmbed();
  let totalLength = 0;
  [].concat.apply([], songData).forEach(el => totalLength += parseInt(el.duration, 10));
  totalLength = await utils.timeParser(totalLength);

  embed
  .setTitle(`Available Playlists (${totalLength})`)
  .addBlankField()
  .setThumbnail('https://i.imgur.com/OpSJJxe.png')
  .setColor(0xff3399);

  if(args[0] === "serverplaylist" || args[0] === "sp")
    embed
    .setAuthor(`${message.guild.name}`, `https://cdn.discordapp.com/avatars/${message.guild.id}/${message.guild.icon}.png?size=2048`);
  else
    embed
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=2048`)

  for(let i = 0; i < playlists.length; i++) {
    if(i > 20) return;
    let overallLength = 0;
    songData[i].forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength);
    embed.addField(`${i + 1}. ${playlists[i].name} (${overallLength})`, `${songData[i].length} Songs`)
  }
  return message.channel.send(embed);
}

module.exports = {
  async findMyPlaylists(message, args, server) {
    userPlaylistsDB.findByDiscordId(message.author.id)
    .then(async playlists => {
      getUserPlaylistSongs(playlists)
      .then(songData => handleEmbed(message, args, playlists, songData))
      .catch(err => console.error(err));
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        message.channel.send(`No playlists found`);
      else console.log(err);
    })    
  },
  async findServerPlaylists(message, args, server) {
    guildPlaylistsDB.findByGuildId(message.guild.id)
    .then(playlists => {
      getGuildPlaylistSongs(playlists)
      .then(songData => handleEmbed(message, args, playlists, songData))
      .catch(err => console.error(err));
    })
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        message.channel.send(`No playlists found`);
      else console.log(err);
    })
  }
}