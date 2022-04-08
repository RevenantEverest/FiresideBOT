const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    message.channel.send('Stoking the campfire...').then(msg => {
        let embed = new Discord.MessageEmbed();
        let ping = msg.createdTimestamp - message.createdTimestamp;

        embed
        .setColor(0xff6600)
        .setDescription(
            `<:Campfire2:597235623631388737> **The Campfire Burns Steadily**\n\n` + 
            `<:Fireside:669895306242162699> **${ping} ms** bot latency\n` +
            `💖 **${Math.round(bot.ws.ping)} ms** heartbeat latency`
        );

        msg.edit(embed);
    });
};

module.exports.config = {
    name: 'ping',
    d_name: 'Ping',
    aliases: [],
    category: 'Other',
    desc: 'Pong',
    example: 'ping'
};