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

module.exports.run = async (PREFIX, message, args, server, bot) => {
    // let seconds = 10;
    // let invokes = 0;
    // message.channel.send(`${seconds} seconds left`).then(async (msg) => updateMessage(invokes, seconds, msg));
    console.log(message.content);
    console.log(/<#?(\d+)>/.exec(args.join(" "))[1])
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: ['other', 'Other'],
    b_desc: '',
    desc: ''
};