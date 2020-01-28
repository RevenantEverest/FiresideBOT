const Discord = require('discord.js');
const config = require('../../config/config');
const YTDL = require('ytdl-core');
const utils = require('./utils');

const guildSettingsController = require('../../controllers/dbControllers/guildSettingsController');

const services = {};

services.playSong = async (bot, connection, message, server) => {
  let currentSongEmbed = new Discord.RichEmbed();
  let request = server.queue.queueInfo[0];

  if(server.queue.isPaused === true) server.queue.isPaused = false;
  if(server.queue.isPlaying === false) server.queue.isPlaying = true;
  if(!request) return;

  /*
    Creates the dispatcher object from the Discord connection object.playStream
    Then sets the volume according to the servers saved volume
  */
  server.dispatcher = connection.playStream(YTDL(request.link, {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25}));
  if(server.queue.options.volume) server.dispatcher.setVolume(server.queue.options.volume / 100)
  else guildSettingsController.getByGuildId(bot, message, "PlaySong", message.guild.id, (settings) => {
    server.queue.options.volume = settings.volume;
    server.dispatcher.setVolume(settings.volume / 100);
  }, () => {});

  currentSongEmbed
    .setTitle('**CURRENT SONG**')
    .addField(request.title, request.author)
    .addField('Link', `[Click Me](${request.link}) \nRequested By: ${request.requestedBy}`)
    .setThumbnail(request.thumbnail)
    .setFooter(`Length: ${await utils.timeParser(request.duration)}`)
    .setColor(0x0be289)
  message.channel.send(currentSongEmbed);

  server.queue.currentSongEmbed = currentSongEmbed;
  server.queue.currentSongInfo = request;

  if(server.queue.options.loop && !config.environment.updatePending) server.queue.queueInfo.push(request);
  else if(server.queue.options.loop && config.environment.updatePending)
    message.channel.send("An update is currently pending. Looping will disabled until the update is pushed");

  server.queue.queueInfo.shift();

  server.dispatcher.once("end", () => {
    if(server.queue.queueInfo[0] && message.guild.voiceConnection) 
      services.playSong(bot, connection, message, server);
    else {
      if(server.queue.options.recommendations) 
        return message.channel.send("This feature has been temporarily removed until a better version is implemented")
      else {
        server.queue.queueInfo = [];
        server.queue.currentSongEmbed = {};
        server.queue.currentSongInfo = {};
        connection.disconnect();
        server.queue.isPlaying = false;
        server.queue.genres = [];
        message.channel.send('Queue concluded.');
      }
    }
  });
}

module.exports = services;