const Discord = require('discord.js');
const userSongsDB = require('../../models/UserModels/userSongsDB');
const utils = require('./utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function handlePages(message, args, server, playlist, songArr, bot) {
    let embed = new Discord.RichEmbed();
    let CPI = 0;

    let overallLength = 0;
    [].concat.apply([], songArr).map(el => overallLength += parseInt(el.songs.duration, 10))
    overallLength = await utils.timeParser(overallLength);

    embed
    .addField(`**${playlist.name}** (${overallLength})`, `${message.author.username}`)
    .setFooter(`Page ${CPI + 1}/${songArr.length}`)
    .addBlankField()
    .setColor(0xcc00ff);

    let counter = 0;
    for(let i = 0; i < songArr[CPI].length; i++) {counter++;
        embed.addField(`**${songArr[CPI][i].index}. ` +
            `${songArr[CPI][i].songs.title}**`, 
            `Author: ${songArr[CPI][i].songs.author} \n Duration: ${await utils.timeParser(songArr[CPI][i].songs.duration)} \n ID: ${songArr[CPI][i].songs.song_id}`
        );
    }

    message.channel.send(embed).then(async (msg) => {
        await msg.react("⏪");
        await msg.react("⏹");
        await msg.react("⏩");

        const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', async (reaction, user) => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
            if(reaction.emoji.name === "⏪") {

                if(CPI === 0) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
                CPI--;
                let backEmbed = new Discord.RichEmbed();
                backEmbed
                .addField(`**${playlist.name}** (${overallLength})`, `${message.author.username}`)
                .setFooter(`Page ${CPI + 1}/${songArr.length}`)
                .addBlankField()
                .setColor(0xcc00ff);

                for(let i = 0; i < songArr[CPI].length; i++) {counter++;
                    backEmbed.addField(`**${songArr[CPI][i].index}. ` +
                        `${songArr[CPI][i].songs.title}**`, 
                        `Author: ${songArr[CPI][i].songs.author} \n Duration: ${await utils.timeParser(songArr[CPI][i].songs.duration)} \n ID: ${songArr[CPI][i].songs.song_id}`
                    );
                }

                reaction.message.edit(backEmbed);
                reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

            }else if(reaction.emoji.name === "⏩") {

                if(CPI === (songArr.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

                CPI++;
                let forwardEmbed = new Discord.RichEmbed();
                forwardEmbed
                .addField(`**${playlist.name}** (${overallLength})`, `${message.author.username}`)
                .setFooter(`Page ${CPI + 1}/${songArr.length}`)
                .addBlankField()
                .setColor(0xcc00ff);

                for(let i = 0; i < songArr[CPI].length; i++) {counter++;
                    forwardEmbed.addField(`**${songArr[CPI][i].index}. ` +
                        `${songArr[CPI][i].songs.title}**`, 
                        `Author: ${songArr[CPI][i].songs.author} \n Duration: ${await utils.timeParser(songArr[CPI][i].songs.duration)} \n ID: ${songArr[CPI][i].songs.song_id}`
                    );
                }

                reaction.message.edit(forwardEmbed);
                reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

            }else if(reaction.emoji.name === "⏹") {
                r_collector.stop();
            }
        });
        r_collector.on('end', e => {
            msg.delete();
        })
    })
}

module.exports = {
    async view(message, args, server, playlist, bot) {

        userSongsDB.findByPlaylistId(playlist.playlist_id)
            .then(async songs => {
                let counter = 0;
                let temp = [];
                let songArr = [];
                if(songs.length >= 20) {
                    for(let i = 0; i < songs.length; i++) {
                        counter++;
                        temp.push({ index: i + 1 ,songs: songs[i]});
                        if(counter === 20) {
                            songArr.push(temp);
                            counter = 0;
                            temp = [];
                        }
                    }
                    songArr.push(temp);
                    handlePages(message, args, server, playlist, songArr, bot);

                }else  {
                    let embed = new Discord.RichEmbed();
                    let overallLength = 0;

                    songs.forEach(el => overallLength += parseInt(el.duration, 10));
                    overallLength = await utils.timeParser(overallLength);

                    embed
                    .addField(`**${playlist.name}** (${overallLength})`, `${message.author.username}`)
                    .addBlankField()
                    .setColor(0xff3399)
                    .setThumbnail('https://i.imgur.com/OpSJJxe.png')

                    let counter = 0;
                    for(let i = 0; i < songs.length; i++) {
                        counter++;
                        embed.addField(`**${counter}. ` + 
                            `${songs[i].title}**`, 
                            `Author: ${songs[i].author} \n Duration: ${await utils.timeParser(songs[i].duration)} \n ID: ${songs[i].song_id}`
                        );
                    }
                    message.channel.send(embed);
                }
                
            })
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData) {
                    message.channel.send('No songs found in playlist `' + playlist.name + '`');
                  }
                  else console.log(err);
            })
    }
};