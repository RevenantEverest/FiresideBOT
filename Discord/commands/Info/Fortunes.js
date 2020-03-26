const Discord = require('discord.js');
const fortunesController = require('../../controllers/dbControllers/fortunesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let embed = new Discord.RichEmbed();

    embed
    .setColor(0xcc33ff)
    .setAuthor(message.guild.name, message.guild.iconURL)

    fortunesController.getByGuildId(bot, message, "Fortunes", message.guild.id, handleFortunes, () => {
        return message.channel.send("No Custom Fortunes");
    });

    async function handleFortunes(fortunes) {
        let fortuneStr = '';
        fortunes.fortunes.forEach((el, idx) => {
            fortuneStr += `${idx + 1}. ${el}\n`
        });
        embed.addField("Fortunes:", fortuneStr);
        message.channel.send(embed);
    };
};

module.exports.config = {
    name: 'fortunes',
    d_name: 'Fortunes',
    aliases: [],
    category: 'Info',
    desc: 'Displays all custom fortunes',
    example: 'fortunes'
};