const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    ksoftServices.randomMeme()
    .then(meme => {
        let embed = new Discord.MessageEmbed();
        embed
        .setColor(0xff3333)
        .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)
        .setTitle(meme.data.author)
        .setDescription(`${meme.data.title}\n\n[Source](${meme.data.source})`)
        .setImage(meme.data.image_url)

        message.channel.send(embed);
    })
    .catch(err => errorHandler(bot, message, err, "API Error", "Memes"));
};

module.exports.config = {
    name: 'memes',
    d_name: 'Memes',
    aliases: ['meme'],
    category: 'Fun',
    desc: 'Returns a random Meme',
    example: 'memes'
};