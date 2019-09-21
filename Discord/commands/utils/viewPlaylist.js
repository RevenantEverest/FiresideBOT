const Discord = require('discord.js');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const guildSongsDB = require('../../models/GuildModels/guildSongsDB');
const utils = require('./utils');
const pagination = require('../utils/pagination');
const errorHandler = require('../../controllers/errorHandler');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function handlePages(message, bot, playlist, songs, author, guildPlaylist) {
    
    let contentArr = [];
    let overallLength = 0;
    songs.forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength);
    let fields = [];
    let counter = 0;
    let rolesText = '';

    if(guildPlaylist && playlist.roles) playlist.roles.forEach(el => rolesText += `<@&${el}> `);
    let category = [`${playlist.name} (${overallLength})`, `${guildPlaylist ? `**Roles**: ${(playlist.roles ? rolesText : 'None')}` : (playlist.public ? 'Public' : 'Private')}`];
    
    for(let i = 0; i < songs.length; i++) {
        counter++;
        let duration = await utils.timeParser(songs[i].duration);
        fields.push({ field: `${i + 1}. ${songs[i].title}`, value: `**Author**: ${songs[i].author}\n**Duration**: ${duration}\n**ID**: ${songs[i].song_id}` });
        if(counter === 5) {
            contentArr.push({ 
                category: category, 
                author: author, 
                fields: fields 
            });
            counter = 0;
            fields = [];
        }
                    
        if(i === (songs.length - 1)) {
            contentArr.push({ 
                category: category, 
                author: author, 
                fields: fields 
            });
            pagination(message, bot, contentArr, { thumbnail: 'https://i.imgur.com/OpSJJxe.png', title: false, color: 0xcc00ff });
        }
    }                                    
}

async function handleSingle(message, playlist, songs, author, guildPlaylist) {
    let embed = new Discord.RichEmbed();
    let overallLength = 0;
    let rolesText = '';

    songs.forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength);

    if(guildPlaylist && playlist.roles) {
        playlist.roles.forEach(el => rolesText += `<@&${el}> `);
        embed.addField(`**${playlist.name}** (${overallLength})`, `**Roles**: ${playlist.roles ? rolesText : 'None'}`)
    }
    else embed.addField(`${playlist.name} (${overallLength})`, `${playlist.public ? 'Public' : 'Private'}`)

    embed
    .setAuthor(author.text, author.image)
    .addBlankField()
    .setColor(0xff3399)
    .setThumbnail('https://i.imgur.com/OpSJJxe.png')

    for(let i = 0; i < songs.length; i++) {
        let duration = await utils.timeParser(songs[i].duration);
        embed.addField(`**${i + 1}. ${songs[i].title}**`, `**Author**: ${songs[i].author}\n**Duration**: ${duration}\n**ID**: ${songs[i].song_id}`);
    }
    message.channel.send(embed);
}

module.exports = {
    async viewUserPlaylist(message, discord_id, playlist, bot) {
        userSongsDB.findByPlaylistId(playlist.playlist_id)
        .then(songs => {
            let discordUser = bot.users.get(discord_id);
            let author = {
                text: `${discordUser.username}#${discordUser.discriminator}`,
                image: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=2048`
            }
            if(songs.length >= 5) handlePages(message, bot, playlist, songs, author, false);
            else  handleSingle(message, playlist, songs, author, false);    
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                message.channel.send(`No songs found in playlist **${playlist.name}**`);
            else errorHandler(bot, message, err, "DB Error", "ViewPlaylist");
        })
    },
    async viewGuildPlaylist(message, args, server, playlist, bot) {
        guildSongsDB.findByPlaylistId(playlist.playlist_id)
        .then(songs => {
            let author = {
                text: `${message.guild.name}`,
                image: message.guild.iconURL
            }
            if(songs.length >= 5) handlePages(message, bot, playlist, songs, author, true);
            else handleSingle(message, playlist, songs, author, true);
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                message.channel.send(`No songs found in playlist **${playlist.name}**`);
            else errorHandler(bot, message, err, "DB Error", "ViewPlaylist");
        })
    }
};