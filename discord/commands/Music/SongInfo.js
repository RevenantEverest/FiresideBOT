const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');
const { strings } = require("../../utils");

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    args.splice(0, 1);
    
    let search = args;
    let filterArr = ['official', 'music', 'video', 'lyric', 'lyrics', 'audio', 'monstercat', 'release', 'version', 'HD'];

    if(!args[1] && server.queue.isPlaying) search = await strings.filter(server.queue.currentSongInfo.title, filterArr, { special: true });
    if(!args[1] && !server.queue.isPlaying) return message.channel.send('Please specify a song');

    let embed = new Discord.MessageEmbed();

    ksoftServices.getLyrics(search)
        .then(results => {
            results = results.data.data[0];
            embed
            .setThumbnail(results.album_art)
            .setColor(0xff3399)
            .setTitle('**Song Info**')
            .addField('Artist: ', results.artist, true)
            .addField('Album: ', results.album, true)
            .addField('Song: ', results.name, true)
            .addField('Release Year: ', results.album_year, true)
            .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)

            message.channel.send(embed);
        })
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401)
                    return message.channel.send('Song not found');
                else return errorHandler(bot, message, err.response, "Ksoft API Error", "SongInfo");
            }
            else errorHandler(bot, message, err, "Ksoft API Error", "SongInfo");
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