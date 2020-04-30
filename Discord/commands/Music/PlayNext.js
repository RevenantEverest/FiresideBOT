const playSong = require('../utils/playSong');
const utils = require('../utils/utils');
const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {

    if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update")

    const requestFilter = ['http://', 'https://', '\.com', 'watch\?v=', 'watch\?V=', 'youtube', 'www\.youtube', 'youtu\.be', '/'];
    let request = '';
    let isLink = false;
    args.splice(0, 1);

    if(await utils.checkString(args[0], requestFilter)) {
        request = await utils.filter(args[0], { special: false });
        isLink = true;
    }
    else request = args.join(" ");

    utils.youtubeSearch(message, args, server, request, { isLink: isLink }, (songInfo) => {
        if(!userstate.premium && songInfo.duration >= 3600)
            return message.channel.send("Non premium requests limited to 1 hour");

        server.queue.queueInfo.splice(0, 0, songInfo);
        message.channel.send(`**${songInfo.title}** was added to the queue. In position **#1**`);
        
        if(!message.guild.voiceConnection)
            message.member.voiceChannel.join()
            .then((connection) => playSong.playSong(bot, connection, message, server))
            .catch(err => errorHandler(bot, message, err, "Join Voice Channel Error", "PlayNext"));
        else if(message.guild.voiceConnection && !server.queue.isPlaying)
            return playSong.playSong(bot, server.queue.connection, message, server);
    });
};

module.exports.config = {
    name: 'playnext',
    d_name: 'PlayNext',
    aliases: ['pn'],
    params: { required: true, params: 'YouTube link or search' },
    category: 'Music',
    desc: 'Requests a song to play next in queue',
    example: 'playnext bring me the horizon can you feel my heart'
};
