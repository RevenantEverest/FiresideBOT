const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');
const utils = require('../utils/utils');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    args.splice(0, 1);
    
    let search = args;
    let filterArr = ['official', 'music', 'video', 'lyric', 'lyrics', 'audio', 'monstercat', 'release', 'version', 'HD'];

    if(!args[1] && server.queue.isPlaying) search = await utils.filter(server.queue.currentSongInfo.title, filterArr, { special: true });
    if(!args[1] && !server.queue.isPlaying) return message.channel.send('Please specify a song');

    let embed = new Discord.RichEmbed();

    ksoftServices.getLyrics(search)
        .then(results => {
            results = results.data.data[0];
            embed
            .setThumbnail(results.album_art)
            .setColor(0xff3399)
            .setTitle('**Song Info**')
            .addBlankField()
            .addField('Artist: ', results.artist, true)
            .addField('Album: ', results.album, true)
            .addField('Song: ', results.name, true)
            .addField('Release Year: ', results.album_year, true)
            .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)

            message.channel.send(embed);
        })
        .catch(err => {
            if(err.response.status === 404)
                return message.channel.send('Song not found');
            else console.error(err.response);
        })
};

module.exports.config = {
    name: 'songinfo',
    d_name: 'SongInfo',
    aliases: [],
    params: { required: true, params: 'Song Name' },
    category: 'Music',
    desc: 'Displays relevant info about a song',
    example: 'songinfo Beartooth Clever'
}