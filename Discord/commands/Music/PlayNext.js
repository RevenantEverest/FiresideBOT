const { strings, youtube, voiceConnection } = require("../../utils");

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {

    if(!args[1]) return message.channel.send("Please provide a link");
    if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel");
    if(options.updatePending) return message.channel.send("An Update is currently pending, features will resume upon Update")

        let isLink = false;
    let isPlaylist = false; 
    let request = '';
    const requestFilter = ['youtube', 'youtu\.be', '\/watch\?v='];
    const youtubePlaylistRequestFilter = ['\/?playlist\?', '&\?list='];
    args.splice(0, 1);

    if(await strings.checkString(args[0], requestFilter)) {
        request = await strings.filter(args[0], { special: false });

        if(await strings.checkString(request, youtubePlaylistRequestFilter)) {
            request = await strings.filter(request, { youtubePlaylist: true });
            isPlaylist = true;
        }
        else 
            isLink = true;
    }
    else request = args.join(" ");

    if(isPlaylist) 
        return youtube.youtubePlaylistSearch(message, args, server, request, playlistSongHandler, addSingleToQueue);
    else 
        return youtube.youtubeSearch(message, args, server, request, { isLink: isLink }, addSingleToQueue);

    async function playlistSongHandler(playlistInfo) {
        let counter = 0;

        for(let i = 0; i < playlistInfo.length; i++) {
            if(!userstate.premium && songInfo.duration >= 3600) counter++;
            server.queue.queueInfo.splice(i + 1, 0, playlistInfo[i]);
        }

        if(counter > 0) message.channel.send(`${counter} song(s) couldn't be added because non premium requests are limited to 1 hour`);
        message.channel.send(`Added ${playlistInfo.length} other song(s) to the queue`);
    };

    async function addSingleToQueue(songInfo) {
        if(!userstate.premium && songInfo.duration >= 3600)
            return message.channel.send("Non premium requests limited to 1 hour");
        
        server.queue.queueInfo.splice(0, 0, songInfo);
        message.channel.send(`**${songInfo.title}** was added to the queue. In position **#1**`);

        voiceConnection.createConnection(server, message);
    }
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
