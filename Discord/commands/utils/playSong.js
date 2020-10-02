const Discord = require('discord.js');
const config = require('../../config/config');
const YTDL = require('ytdl-core');
const moment = require('moment');
const utils = require('./utils');

const guildSettingsController = require('../../controllers/dbControllers/guildSettingsController');
const musicLogsController = require('../../controllers/dbControllers/musicLogsController');
const likedSongController = require('../../controllers/dbControllers/likedSongsController');

const services = {};

async function clearQueue(server, message, connection) {
    if(server.queue.options.recommendations) 
        message.channel.send("This feature has been temporarily removed until a better version is implemented");

    server.queue.queueInfo, server.queue.genres = [];
    server.queue.currentSongEmbed, server.queue.currentSongInfo = {};
    
    server.queue.isPlaying = false;
    message.channel.send('Queue concluded.');
    server.queue.disconnectTimer = setTimeout(() => {
        if(!server.queue.isPlaying) {
            server.queue.connection = null;
            return connection.disconnect();
        }
    }, 300000);
};

services.playSong = async (bot, connection, message, server) => {
    let currentSongEmbed = new Discord.MessageEmbed();
    let request = server.queue.queueInfo[0];
    server.queue.connection = connection;

    if(server.queue.isPaused === true) server.queue.isPaused = false;
    if(server.queue.isPlaying === false) server.queue.isPlaying = true;
    if(!request) return;
    if(server.queue.disconnectTimer) clearTimeout(server.queue.disconnectTimer);

    /*
        Creates the dispatcher object from the Discord connection object.playStream
        Then sets the volume according to the servers saved volume
    */

    server.dispatcher = connection.play(YTDL(request.link, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 }));
    if(server.queue.options.volume) server.dispatcher.setVolume(server.queue.options.volume / 100)
    else guildSettingsController.getByGuildId(bot, message, "PlaySong", message.guild.id, (settings) => {
        server.queue.options.volume = settings.volume;
        server.dispatcher.setVolume(settings.volume / 100);
    }, () => {});

    let data = { 
        guild_id: message.guild.id, 
        discord_id: request.requestedBy.id, 
        title: request.title, 
        author: request.author, 
        link: request.link, 
        duration: request.duration,
        thumbnail_url: request.thumbnail,
        date: moment()
    };
    musicLogsController.save(bot, message, "Utils: PlaySong", data, () => {})

    currentSongEmbed
    .setTitle('**CURRENT SONG**')
    .addField(request.title, request.author)
    .addField('Link', `[Click Me](${request.link}) \nRequested By: ${request.requestedBy}`)
    .setThumbnail(request.thumbnail)
    .setFooter(`Length: ${await utils.timeParser(request.duration)}`)
    .setColor(0x0be289)
    message.channel.send(currentSongEmbed).then(msg => services.handleLikedSong(bot, message, msg, data));

    server.queue.currentSongEmbed = currentSongEmbed;
    server.queue.currentSongInfo = request;

    if(server.queue.options.loop && !config.environment.updatePending) server.queue.queueInfo.push(request);
    else if(server.queue.options.loop && config.environment.updatePending)
        message.channel.send("An update is currently pending. Looping will disabled until the update is pushed");

    server.queue.queueInfo.shift();

    server.dispatcher.once("finish", () => {
        if(server.queue.queueInfo[0] && message.guild.voice.connection) 
            services.playSong(bot, connection, message, server);
        else 
            clearQueue(server, message, connection);
    });
};

services.handleLikedSong = async (bot, message, msg, data) => {
    const heartReacts = ["❤️", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"];
    const chosenReact = heartReacts[Math.floor(Math.random() * heartReacts.length)];
    let userReactions = [];
    await msg.react(chosenReact);

    const r_collector = new Discord.ReactionCollector(msg, r => r.users.cache.array(), { time: (data.duration >= 600 ? 120000 : data.duration * 1000) });
    r_collector.on('collect', (reaction, user) => {
        if(user.id === bot.user.id || userReactions.includes(user.id)) return;

        if(reaction.emoji.name === chosenReact) {
            userReactions.push(user.id);
            likedSongController.getByDiscordId(bot, message, "Utils: PlaySong", user.id, saveLikedSong, () => saveLikedSong(null));
        }

        async function saveLikedSong(likedSongs) {
            if(likedSongs && likedSongs.map(el => el.link).includes(data.link)) return;
            data.discord_id = user.id;
            likedSongController.save(bot, message, "Utils: PlaySong", data, () => {
                msg.channel.send(`**${data.title}** added to Liked Songs`);
            });
        };
    });
    r_collector.on('end', () => {
        if(message.channel.type === "dm") return;
        
        let permissions =  new Discord.Permissions(message.channel.permissionsFor(bot.user).bitfield);
        if(!permissions.has("MANAGE_MESSAGES")) return;
        msg.reactions.removeAll();
    });
};

module.exports = services;