const Discord = require('discord.js');
const fortunesController = require('../../controllers/dbControllers/fortunesController');
const pagination = require('../utils/pagination');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    fortunesController.getByGuildId(bot, message, "Fortunes", message.guild.id, handleFortunes, () => {
        return message.channel.send("No Custom Fortunes");
    });

    async function handleFortunes(fortunes) {
        if(fortunes.fortunes.length > 5) return handlePagination(fortunes);

        let embed = new Discord.MessageEmbed();
        let fortuneStr = '';

        embed
        .setColor(0xcc33ff)
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        
        fortunes.fortunes.forEach((el, idx) => {
            fortuneStr += `${idx + 1}. ${el}\n`
        });
        embed.addField("Fortunes:", fortuneStr);
        message.channel.send(embed);
    };

    async function handlePagination(fortunes) {
        let contentArr = [];

        let fieldValue = '';
        let category = 'Custom Fortunes';
        let author = { text: message.guild.name, image: message.guild.iconURL({ dynamic: true }) };
        fortunes.fortunes.forEach((el, idx) => {
            fieldValue += `${idx + 1}. ${el}\n`
            if((idx + 1) % 5 === 0 && idx !== 0) {
                contentArr.push({ category: category, author: author, fields: [{ field: "Fortunes", value: fieldValue }] });
                fieldValue = '';
            }
            if((fortunes.fortunes.length - 1) === idx)
                contentArr.push({ category: category, author: author, fields: [{ field: "Fortunes", value: fieldValue }] });
        });

        pagination(message, bot, contentArr, { title: true, color: 0xcc33ff });
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