const Discord = require('discord.js');
const config = require('../../../config/config');
const timeParser = require('../utils/timeParser');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;

    let embed = new Discord.RichEmbed();
    
    embed.setTitle('Queues In Progress').setColor(0x33ccff).addBlankField()

    let queuesInProgress = config.servers.map(el => el.queue.isPlaying).length;
    let queueLengthInSeconds = 0;
    [].concat.apply([], config.servers.map(el => el.queue.queueInfo)).map(el => el.duration).forEach(el => {
        queueLengthInSeconds += parseInt(el, 10);
    });
    let queueSongAmount = [].concat.apply([], config.servers.map(el => el.queue.queueInfo)).length;

    embed
    .addField("In Progress:", queuesInProgress, true)
    .addField("Overall Length: ", await timeParser(queueLengthInSeconds), true)
    .addField("Songs In Queue:", queueSongAmount)

    message.channel.send(embed);
};

module.exports.config = {
    name: 'checkqueue',
    d_name: 'CheckQueue',
    aliases: []
};