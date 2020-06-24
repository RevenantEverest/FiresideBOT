const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    ksoftServices.randomCutePics()
    .then(cutePic => {
        let embed = new Discord.MessageEmbed();
        embed
        .setColor(0xff66cc)
        .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)
        .setTitle(cutePic.data.author)
        .setDescription(`${cutePic.data.title}\n\n[Source](${cutePic.data.source})`)
        .setImage(cutePic.data.image_url)

        message.channel.send(embed);
    })
    .catch(err => errorHandler(bot, message, err, "API Error", "CutePics"));
};

module.exports.config = {
    name: 'cutepics',
    d_name: 'CutePics',
    aliases: ['cutepic'],
    category: 'Fun',
    desc: 'Returns a random Cute Picture',
    example: 'cutepics'
};