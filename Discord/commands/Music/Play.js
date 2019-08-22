const playSong = require('../utils/playSong');
const utils = require('../utils/utils');

async function setQueue(message, args, server, options) {
  server.queue.queueInfo.push(options.songInfo);
  message.channel.send(`**${options.songInfo.title}** was added to the queue. In position **#${server.queue.queueInfo.length}**`);
  if(!message.guild.voiceConnection) 
    message.member.voiceChannel.join()
    .then((connection) => {
      playSong.playSong(connection, message, server);
    })
    .catch(err => console.error(err));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update")

    let request = '';
    const requestFilter = ['http://', 'https://', '\.com', 'watch\?v=', 'watch\?V=', 'youtube', 'www\.youtube', 'youtu\.be', '/'];
    args.splice(0, 1);

    await utils.checkString(args[0], requestFilter) ? request = await utils.filter(args[0], { special: false }) : request = args.join(" ");

    utils.youtubeSearch(message, args, server, request, {}, setQueue);
};

module.exports.config = {
    name: 'play',
    d_name: 'Play',
    aliases: ['p'],
    params: { required: true, params: 'YouTube Link or Search Request' },
    category: 'Music',
    desc: 'Plays a requested YouTube Link or Search Request',
    example: 'play kingdom hearts sanctuary'
}