const Discord = require('discord.js');
const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');
const pagination = require('../utils/pagination');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    newMemberMessagesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleNewMemberMessages, () => {
        return message.channel.send("No New Member Messages");
    });

    async function handleNewMemberMessages(newMemberMessages) {
        if(newMemberMessages.messages.length > 5) return handlePagination(newMemberMessages);

        let embed = new Discord.RichEmbed();
        let messagesStr = '';
        embed
        .setColor(0xcc33ff)
        .setAuthor(message.guild.name, message.guild.iconURL)

        newMemberMessages.messages.forEach((el, idx) => {
            messagesStr += `${idx + 1}. ${el}\n`
        });
        embed.addField("New Member Messages:", messagesStr);
        message.channel.send(embed);
    };

    async function handlePagination(newMemberMessages) {
        let contentArr = [];
        let fieldValue = '';
        let category = 'New Member Messages';
        let author = { text: message.guild.name, image: message.guild.iconURL };
        newMemberMessages.messages.forEach((el, idx) => {
            fieldValue += `${idx + 1}. ${el}\n`;
            if((idx + 1) % 5 === 0 && idx !== 0) {
                contentArr.push({ category: category, author: author, fields: [{ field: "Messages", value: fieldValue }] });
                fieldValue = '';
            }
            if((newMemberMessages.messages.length - 1) === idx)
                contentArr.push({ category: category, author: author, fields: [{ field: "Messages", value: fieldValue }] });
        });

        pagination(message, bot, contentArr, { title: true, color: 0xcc33ff });
    };
};

module.exports.config = {
    name: 'newmembermessages',
    d_name: 'NewMemberMessages',
    aliases: ['nmm'],
    category: 'Info',
    desc: 'Displays all New Member Messages',
    example: 'newmembermessages'
};