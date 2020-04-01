const Discord = require('discord.js');
const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let embed = new Discord.RichEmbed();

    embed
    .setColor(0xcc33ff)
    .setAuthor(message.guild.name, message.guild.iconURL)

    newMemberMessagesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleNewMemberMessages, () => {
        return message.channel.send("No New Member Messages");
    });

    async function handleNewMemberMessages(newMemberMessages) {
        let messagesStr = '';
        newMemberMessages.messages.forEach((el, idx) => {
            messagesStr += `${idx + 1}. ${el}\n`
        });
        embed.addField("New Member Messages:", messagesStr);
        message.channel.send(embed);
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