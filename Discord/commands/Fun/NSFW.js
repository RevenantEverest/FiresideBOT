const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    ksoftServices.randomNSFW()
    .then(nsfw => {
        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff3333)
        .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)
        .addField(nsfw.data.author, `${nsfw.data.title}\n[Source](${nsfw.data.source})`)
        .setImage(nsfw.data.image_url)

        message.channel.send(embed);
    })
    .catch(err => console.error(err));
};

module.exports.config = {
    name: 'nsfw',
    d_name: 'NSFW',
    aliases: [],
    category: 'Fun',
    desc: 'Returns a random NSFW Picture',
    example: 'nsfw'
};