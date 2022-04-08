const Discord = require('discord.js');
const config = require('../../config/config');
const { time } = require("../../utils");

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;

    let embed = new Discord.MessageEmbed();
    
    embed.setTitle('Queues In Progress').addBlankField()

    let queuesInProgress = config.servers.filter(el => el.queue.isPlaying).length || 0;
    let queueLengthInSeconds = 0;
    let queueSongAmount = 0;
    if(queuesInProgress >= 1) {
        [].concat.apply([], config.servers.map(el => el.queue.queueInfo)).map(el => el.duration).forEach(el => {
            queueLengthInSeconds += parseInt(el, 10);
        });

        [].concat.apply([], config.servers.map(el => el.queue.currentSongInfo)).map(el => el.duration).filter(Boolean).forEach(el => {
            queueLengthInSeconds += parseInt(el, 10);
            console.log(el);
        });

        console.log("Original Queue Length In Seconds => ", queueLengthInSeconds)
        queueSongAmount = [].concat.apply([], config.servers.map(el => el.queue.queueInfo)).length;
        queueLengthInSeconds = await time.timeParser(queueLengthInSeconds);
    }

    queuesInProgress ? embed.setColor(0x00ff00) : embed.setColor(0xff0000);
    
    embed
    .addField("In Progress:", queuesInProgress, true)
    .addField("Overall Length: ", queueLengthInSeconds, true)
    .addField("Songs In Queue:", (queuesInProgress > 0 ? (queueSongAmount + queuesInProgress) : "0"), true)

    message.channel.send(embed);
};

module.exports.config = {
    name: 'checkqueue',
    d_name: 'CheckQueue',
    aliases: [],
    category: "Dev"
};