const Discord = require('discord.js');
const userSongsDB = require('../../../models/UserModels/userSongsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function handlePages(message, args, server, playlist, songArr, bot) {
    let embed = new Discord.RichEmbed();
    let CPI = 0;

    embed.addField(`**${playlist.name}**`, `${message.author.username}`).setFooter(`Page ${CPI + 1}/${songArr.length}`).addBlankField().setColor(0xcc00ff);

    let counter = 0;

    for(let i = 0; i < songArr[CPI].length; i++) {counter++;
        let minutes = Math.floor(songArr[CPI][i].songs.duration / 60);
        let seconds = Math.floor(songArr[CPI][i].songs.duration - minutes * 60);
        embed.addField(`**${songArr[CPI][i].index}. ` +
            `${songArr[CPI][i].songs.title}**`, `Author: ${songArr[CPI][i].songs.author} \n Duration: ${minutes}:${seconds} \n ID: ${songArr[CPI][i].songs.song_id}`);
    }

    message.channel.send(embed).then(async (msg) => {
        await msg.react("⏪");
        await msg.react("⏹");
        await msg.react("⏩");

        const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', (reaction, user) => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
            if(reaction.emoji.name === "⏪") {

                if(CPI === 0) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
                CPI--;
                let backEmbed = new Discord.RichEmbed();
                backEmbed.addField(`**${playlist.name}**`, `${message.author.username}`).setFooter(`Page ${CPI + 1}/${songArr.length}`).addBlankField().setColor(0xcc00ff);

                for(let i = 0; i < songArr[CPI].length; i++) {counter++;
                    let minutes = Math.floor(songArr[CPI][i].songs.duration / 60);
                    let seconds = Math.floor(songArr[CPI][i].songs.duration - minutes * 60);
                    backEmbed.addField(`**${songArr[CPI][i].index}. ` +
                        `${songArr[CPI][i].songs.title}**`, `Author: ${songArr[CPI][i].songs.author} \n Duration: ${minutes}:${seconds} \n ID: ${songArr[CPI][i].songs.song_id}`);
                }

                reaction.message.edit(backEmbed);
                reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

            }else if(reaction.emoji.name === "⏩") {

                if(CPI === (songArr.length - 1)) return reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);

                CPI++;
                let forwardEmbed = new Discord.RichEmbed();
                forwardEmbed.addField(`**${playlist.name}**`, `${message.author.username}`).setFooter(`Page ${CPI + 1}/${songArr.length}`).addBlankField().setColor(0xcc00ff);

                for(let i = 0; i < songArr[CPI].length; i++) {counter++;
                    let minutes = Math.floor(songArr[CPI][i].songs.duration / 60);
                    let seconds = Math.floor(songArr[CPI][i].songs.duration - minutes * 60);
                    forwardEmbed.addField(`**${songArr[CPI][i].index}. ` +
                        `${songArr[CPI][i].songs.title}**`, `Author: ${songArr[CPI][i].songs.author} \n Duration: ${minutes}:${seconds} \n ID: ${songArr[CPI][i].songs.song_id}`);
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
    view(message, args, server, playlist, bot) {
        let embed = new Discord.RichEmbed();
        embed
            .addField(`**${playlist.name}**`, `${message.author.username}`)
            .addBlankField()
            .setColor(0xff3399)
            .setThumbnail('https://i.imgur.com/OpSJJxe.png')

        userSongsDB.findByPlaylistId(playlist.playlist_id)
            .then(songs => {
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
                    let counter = 0;
                    for(let i = 0; i < songs.length; i++) {
                        counter++;
                        let minutes = Math.floor(songs[i].duration / 60);
                        let seconds = Math.floor(songs[i].duration - minutes * 60);
                        embed.addField(`**${counter}. ` + 
                            `${songs[i].title}**`, `Author: ${songs[i].author} \n Duration: ${minutes}:${seconds} \n ID: ${songs[i].song_id}`);
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