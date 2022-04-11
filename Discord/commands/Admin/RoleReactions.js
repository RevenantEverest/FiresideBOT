const Discord = require('discord.js');
const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');
const { pagination } = require("../../utils");

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    roleReactionsController.getByGuildId(bot, message, "RoleReactions", message.guild.id, handleRoleReactions, () => {
        return message.channel.send("No Role Reactions found");
    });

    async function handleRoleReactions(roleReactions) {
        if(roleReactions.length > 5) return parsePagination(roleReactions);

        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0xff3399)
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setTitle("Role Reactions")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))

        roleReactions.forEach((el, idx) => {

            const emoji = /[\d]{18}/gi.test(el.emoji_id) ? bot.emojis.resolve(el.emoji_id) : el.emoji_id;
            const isDefaultEmoji = Boolean(!emoji.id);

            const isAnimated = isDefaultEmoji ? false : emoji.animated;
            const emojiReaction = isDefaultEmoji ? emoji : `<${isAnimated ? "a" : ""}:${emoji.name}:${emoji.id}>`;

            let role = message.guild.roles.resolve(el.role_id);
            embed.addField(
                `${idx + 1}. @${role.name}`, 
                `**Emoji:** ${emojiReaction}\n` + 
                `**Channel:** <#${el.channel_id}>\n` +
                `**Message Link:** [Message](https://discord.com/channels/${message.guild.id}/${el.channel_id}/${el.message_id})\n` + 
                `**ID:** ${el.id}`
            );
        });

        return message.channel.send(embed);
    };

    async function parsePagination(roleReactions) {
        let contentArr = [];
        let options = { 
            thumbnail: message.guild.iconURL({ dynamic: true }),  
            color: 0xff3399,
            author: true,
            title: true
        };
        let author = { text: message.guild.name, image: options.thumbnail };
        let category = `Role Reactions`;

        let temp = [];
        roleReactions.forEach((el, idx) => {
            if(idx % 5 === 0 && idx !== 0) {
                contentArr.push({ category: category, author: author, fields: temp });
                temp = [];
            }
            
            const emoji = /[\d]{18}/gi.test(el.emoji_id) ? bot.emojis.resolve(el.emoji_id) : el.emoji_id;
            const isDefaultEmoji = Boolean(!emoji.id);

            const isAnimated = isDefaultEmoji ? false : emoji.animated;
            const emojiReaction = isDefaultEmoji ? emoji : `<${isAnimated ? "a" : ""}:${emoji.name}:${emoji.id}>`;

            let role = message.guild.roles.resolve(el.role_id);
            temp.push({ 
                field: `${idx + 1}. ${role.name}`, 
                value:  `**Emoji:** ${emojiReaction}\n` + 
                        `**Channel:** <#${el.channel_id}>\n` + 
                        `**Message Link:** [Message](https://discord.com/channels/${message.guild.id}/${el.channel_id}/${el.message_id})\n` + 
                        `**ID:** ${el.id}`
            });
        });

        if(temp.length > 0) contentArr.push({ category: category, author: author, fields: temp });

        pagination.createPagination(message, bot, contentArr, options);
    };
};

module.exports.config = {
    name: 'rolereactions',
    d_name: 'RoleReactions',
    aliases: ['rolereaction'],
    category: 'Admin',
    desc: `Displays all Role Reactions`,
    example: `rolereactions`
};