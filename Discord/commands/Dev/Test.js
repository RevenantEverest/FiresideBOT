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
    console.log(args);
    //<@&>
    message.channel.send("Hello @everyone")
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};