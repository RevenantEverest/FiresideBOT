module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specifiy a song to delete.");

    let index = parseInt(args[1], 10) - 1;
    if(isNaN(index)) return message.channel.send("Please specify a numeric value.");
    if(!server.queue.queueInfo[index]) return message.channel.send(`Song doesn't exist in queue.`);
    let removedSong = server.queue.queueInfo[index].title;
    server.queue.queueInfo.splice(index, 1);
    message.channel.send(`**${removedSong}** has been removed from the queue.`);
};

module.exports.config = {
    name: 'delsong',
    d_name: 'Delsong',
    aliases: ['ds'],
    params: { required: true, params: 'ID' },
    category: 'Music',
    desc: 'Deletes a song from the queue',
    example: 'delsong 4'
};