const Discord = require('discord.js');
const utils = require('./utils');
const pagination = require('../utils/pagination');

const userSongsController = require('../../controllers/dbControllers/userSongsController');
const guildSongsController = require('../../controllers/dbControllers/guildSongsController');

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
            contentArr.push({ category: category, author: author, fields: fields });
            counter = 0;
            fields = [];
        }
                    
        if(i === (songs.length - 1)) {
            if(counter !== 0) contentArr.push({ category: category, author: author, fields: fields });
            pagination(message, bot, contentArr, { thumbnail: 'https://i.imgur.com/OpSJJxe.png', title: false, color: 0xcc00ff });
        }
    }                                    
}

async function handleSingle(message, playlist, songs, author, guildPlaylist) {
    let embed = new Discord.MessageEmbed();
    let overallLength = 0;
    let rolesText = '';

    songs.forEach(el => overallLength += parseInt(el.duration, 10));
    overallLength = await utils.timeParser(overallLength);

    if(guildPlaylist && playlist.roles) {
        playlist.roles.forEach(el => rolesText += `<@&${el}> `);
        embed
        .setTitle(`**${playlist.name}** (${overallLength})`)
        .setDescription(`**Roles**: ${playlist.roles ? rolesText : 'None'}`)
    }
    else embed.setTitle(`${playlist.name} (${overallLength})`).setDescription(`${playlist.public ? 'Public' : 'Private'}`)

    embed
    .setAuthor(author.text, author.image)
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
        userSongsController.getByPlaylistId(bot, message, "ViewPlaylist", playlist.playlist_id, handleSongs, () => {
            return message.channel.send(`No songs found in playlist **${playlist.name}**`);
        });

        async function handleSongs(songs) {
            let discordUser = bot.users.resolve(discord_id);
            let author = {
                text: `${discordUser.username}#${discordUser.discriminator}`,
                image: discordUser.avatarURL({ dynamic: true })
            };
            if(songs.length >= 5) return handlePages(message, bot, playlist, songs, author, false);
            else return handleSingle(message, playlist, songs, author, false);   
        };
    },
    async viewGuildPlaylist(message, args, server, playlist, bot) {
        guildSongsController.getByPlaylistId(bot, message, "ViewPlaylist", playlist.playlist_id, handleSongs, () => {
            return message.channel.send(`No songs found in playlist **${playlist.name}**`);
        });

        async function handleSongs(songs) {
            let author = {
                text: message.guild.name,
                image: message.guild.iconURL({ dynamic: true })
            };
            if(songs.length >= 5) return handlePages(message, bot, playlist, songs, author, true);
            else return handleSingle(message, playlist, songs, author, true);
        };
    }
};