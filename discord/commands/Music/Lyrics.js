const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');
const { strings } = require("../../utils");

const errorHandler = require('../../controllers/errorHandler');

async function handleEmbed(results, tempArr, index) {
    let embed = new Discord.MessageEmbed();
  
    embed
    .setThumbnail(results.album_art)
    .setColor(0xff3399)
    .setTitle('**Song Info**')
    .addField('Artist: ', results.artist, true)
    .addField('Album: ', results.album, true)
    .addField('Song: ', results.name, true)
    .addField('Release Year: ', results.album_year, true)
    .addField('Lyrics: ', `${tempArr[index]} \n\n *Page ${index + 1}/${tempArr.length}*`)
    .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)
  
    return embed;
  };

async function handlePages(message, results, bot) {
    let index = 0;
  
    let tempArr = [];
    let tempStr = '';
    let counter = 0;
    for(let i = 0; i < results.lyrics.split("").length; i++) {
        counter++;
        tempStr += results.lyrics.split("")[i];
        if(counter === 400) {
            tempArr.push(tempStr);
            tempStr = '';
            counter = 0;
        }
    }
    tempArr.push(tempStr);

    let embed = await handleEmbed(results, tempArr, index);
  
    message.channel.send(embed).then(async (msg) => {
        await msg.react("⏪");
        await msg.react("⏹");
        await msg.react("⏩");
  
        const r_collector = new Discord.ReactionCollector(msg, r => r.users.cache.array()[r.users.cache.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', async (reaction, user) => {
            if(reaction.users.cache.array()[reaction.users.cache.array().length - 1].id === bot.user.id) return;
            if(reaction.emoji.name === "⏹") r_collector.stop();

            if(reaction.emoji.name === "⏪") index === 0 ? index = (tempArr.length - 1) : index--;
            else if(reaction.emoji.name === "⏩") index === (tempArr.length - 1) ? index = 0 : index++;

            embed = await handleEmbed(results, tempArr, index);

            reaction.message.edit(embed);
        });
        r_collector.on("end", () => msg.reactions.removeAll());
    })
};

function handleSinglePage(message, results) {
    let embed = new Discord.MessageEmbed();
    embed
        .setThumbnail(results.album_art)
        .setColor(0xff3399)
        .setTitle('**Song Info**')
        .addField('Artist: ', results.artist, true)
        .addField('Album: ', results.album, true)
        .addField('Song: ', results.name, true)
        .addField('Release Year: ', results.album_year, true)
        .addField('Lyrics: ', '\n' + results.lyrics)
        .setFooter('Powered By KSoft.Si', `https://cdn.ksoft.si/images/Logo1024-W.png`)

        message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    args.splice(0,1);
    let search = args.join(" ");
    const filterArr = ['official', 'music', 'video', 'lyric', 'lyrics', 'audio', 'monstercat', 'release', 'version', 'HD'];
    
    if(!args[1] && server.queue.isPlaying) 
        search = await strings.filter(server.queue.currentSongInfo.title, filterArr, { special: true });
    else if(!args[1] && !server.queue.isPlaying) 
        return message.channel.send('Please specify a song');

    let re = /([a-z -]*)?(?:(?:\(?(?:official music video|official video)\)?)?)/gi
    search = re.exec(search)[1];
    
    ksoftServices.getLyrics(search)
        .then(results => {
            results = results.data.data[0];
            if(results.lyrics.split("").length >= 1024)
                handlePages(message, results, bot);
            else
                handleSinglePage(message, results);
        })
        .catch(err => {
            if(err.response.status === 404)
                return message.channel.send('Song not found')
            else errorHandler(bot, message, err, "Ksoft API Error", "Lyrics");
        });
};

module.exports.config = {
    name: 'lyrics',
    d_name: 'Lyrics',
    aliases: [],
    params: {required: false, params: 'Song name'},
    category: 'Music',
    desc: 'Displays lyrics for a song along with relevant song info',
    example: 'lyrics Trust in me Mr Fijiwiji'
};