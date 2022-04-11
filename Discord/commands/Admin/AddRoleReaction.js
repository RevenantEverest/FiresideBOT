const Discord = require('discord.js');
const emojiRegex = require('emoji-regex');
const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');
const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(args.length < 4) return message.channel.send("Please specify a message id or message link, role, and an emoji");

    const argsString = args.join(" ");

    let role_id = null;
    if(/<@&?(\d+)>/.exec(argsString)) role_id = /<@&?(\d+)>/.exec(argsString)[1];
    else return message.channel.send("Please tag a Role you'd like server members who react to the embed to be given");

    let message_id = null;
    let channel_id = null;
    if(/[\d]{18}/gi.test(argsString)) {
        message_id = argsString.match(/[\d]{18}/gi)[2];
        channel_id = argsString.match(/[\d]{18}/gi)[1];
    }
    else return message.channel.send("Please supply a message link of the message you'd like to add role reactions to");

    let emoji = null;
    if(/<a?:(\w+):(\d+)>/ig.exec(argsString))
        emoji = { name: /<a?:(\w+):(\d+)>/ig.exec(argsString)[1], id: /<a?:(\w+):(\d+)>/ig.exec(argsString)[2] };
    else {
        try {
            const emojiUnicode = emojiRegex().exec(message.content);
            emoji = emojiUnicode[0];
        }
        catch(err) {
            return message.channel.send("Please specify an emoji you'd like server members to react with");
        }
    }

    if(emoji.id && !bot.emojis.resolve(emoji.id)) 
        return message.channel.send("Fireside doesn't have access to that emoji. For reliability, use an emoji from this server");
    
    const isDefaultEmoji = Boolean(!emoji.id);
    const data = {
        guild_id: message.guild.id,
        message_id: message_id,
        channel_id: channel_id,
        role_id: role_id,
        emoji_id: isDefaultEmoji ? emoji : emoji.id
    };

    roleReactionsController.getByGuildIdAndMessageIdAndRoleId(bot, message, "AddRoleReaction", data, handleAlreadyExists, () => {
        roleReactionsController.save(bot, message, "AddRoleReaction", data, handleReactToMessage);
    });

    async function handleAlreadyExists(roleReaction) {
        return message.channel.send(`Role reaction already exists with ID **${roleReaction.id}**`);
    };

    async function handleReactToMessage() {
        try {
            const isAnimated = isDefaultEmoji ? false : bot.emojis.resolve(emoji.id).animated;
            const channel = await bot.channels.fetch(channel_id);
            const msg = await channel.messages.fetch(message_id);

            const emojiReaction = isDefaultEmoji ? emoji : `<${isAnimated ? "a" : ""}:${emoji.name}:${emoji.id}>`;
            await msg.react(emojiReaction);
            message.channel.send("Role Reaction Created");
        }
        catch(err) {
            errorHandler(bot, message, err, "Error Fetching Message", "AddRoleReaction")
        }
    };
};

module.exports.config = {
    name: 'addrolereaction',
    d_name: 'AddRoleReaction',
    aliases: ['arr'],
    params: { required: true, params: '@Role Tag, #text-channel-tag, emoji' },
    category: 'Admin',
    desc: 'Add role reaction to existing embed or message',
    example: 'addrolereaction <Message ID or Message Link Here> @Gamers #general ❤️'
};