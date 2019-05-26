const apiServices = require('../../services/apiServices');
const Discord = require('discord.js');

async function updateMessage(invokes, seconds, msg) {
    if(invokes >= 10) return;
    else
        setTimeout(() => {
            invokes++;
            seconds--;
            msg.edit(`${seconds} seconds left`);
            updateMessage(invokes, seconds, msg)
        }, 1000)
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    // console.log(args);
    //<@&>
    // message.channel.send("Hello @everyone")
    let embed = new Discord.RichEmbed();
    embed.setTitle("Hello World", false, message.author.avatarURL)
    .setAuthor("My Name", message.author.avatarURL)
    .setThumbnail('https://cdn.r6stats.com/seasons/ranks/platinum-3.svg')
    message.channel.send(embed)
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};