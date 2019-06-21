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
    // if(message.author.id !== "163346982709100546") return;
    // console.log(bot.guilds.get(message.guild.id).roles.array().map(el => { return {name: el.name, id: el.id} }))
    console.log(message.channel.id)
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};