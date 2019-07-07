const Discord = require('discord.js');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');
const utils = require('./utils');
const pagination = require('../utils/pagination');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function handlePages(message, bot, playlist, songs, author) {
    let contentArr = [];
    let overallLength = 0;
    songs.forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength, true);
    let fields = [];
    let counter = 0;
    for(let i = 0; i < songs.length; i++) {
        counter++;
        let duration = await utils.timeParser(songs[i].duration);
        fields.push({ field: `${i + 1}. ${songs[i].title}`, value: `**Author**: ${songs[i].author}\n**Duration**: ${duration}\n**ID**: ${songs[i].song_id}` });
        if(counter === 5) {
            contentArr.push({ 
                category: `${playlist.name} (${overallLength})`, 
                author: author, 
                fields: fields 
            });
            counter = 0;
            fields = [];
        }
                    
        if(i === (songs.length - 1)) {
            contentArr.push({ 
                category: `${playlist.name} (${overallLength})`, 
                author: author, 
                fields: fields 
            });
            pagination(message, bot, contentArr, { thumbnail: 'https://i.imgur.com/OpSJJxe.png', color: 0xcc00ff, author: true });
        }
    }                                    
}

async function handleSingle(message, playlist, songs, author, guildPlaylist) {
    let embed = new Discord.RichEmbed();
    let overallLength = 0;

    songs.forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength);

    embed
    .setAuthor(author.text, author.image)
    .setTitle(`**${playlist.name}** (${overallLength})`)
    .addBlankField()
    .setColor(0xff3399)
    .setThumbnail('https://i.imgur.com/OpSJJxe.png')

    if(guildPlaylist && playlist.roles) {
        let rolesText = '';
        playlist.roles.forEach(el => rolesText += `<@&${el}> `);
        embed.addField('Available Roles:', rolesText).addBlankField();
    }

    for(let i = 0; i < songs.length; i++) {
        let duration = await utils.timeParser(songs[i].duration);
        embed.addField(`**${i + 1}. ${songs[i].title}**`, `**Author**: ${songs[i].author}\n**Duration**: ${duration}\n**ID**: ${songs[i].song_id}`);
    }
    message.channel.send(embed);
}

module.exports = {
    async viewUserPlaylist(message, args, server, playlist, bot) {
        userSongsDB.findByPlaylistId(playlist.playlist_id)
        .then(songs => {
            let author = {
                text: `${message.author.username}#${message.author.discriminator}`,
                image: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=2048`
            }
            if(songs.length >= 20) handlePages(message, bot, playlist, songs, author);
            else  handleSingle(message, playlist, songs, author);    
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                message.channel.send(`No songs found in playlist **${playlist.name}**`);
            else console.log(err);
        })
    },
    async viewGuildPlaylist(message, args, server, playlist, bot) {
        guildSongsDB.findByPlaylistId(playlist.playlist_id)
        .then(songs => {
            let author = {
                text: `${message.guild.name}`,
                image: `https://cdn.discordapp.com/avatars/${message.guild.id}/${message.guild.icon}.png?size=2048`
            }
            if(songs.length >= 20) handlePages(message, bot, playlist, songs, author, true);
            else handleSingle(message, playlist, songs, author, true);
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                message.channel.send(`No songs found in playlist **${playlist.name}**`);
            else console.log(err);
        })
    }
};