const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    ksoftServices.randomMeme()
    .then(meme => {
        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff3333)
        .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)
        .addField(meme.data.author, `${meme.data.title}\n[Source](${meme.data.source})`)
        .setImage(meme.data.image_url)

        message.channel.send(embed);
    })
    .catch(err => console.error(err));
};

module.exports.config = {
    name: 'memes',
    d_name: 'Memes',
    aliases: ['meme'],
    category: 'Fun',
    desc: 'Returns a random Meme',
    example: 'memes'
};