const Discord = require('discord.js');
const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1] || !args[2]) return message.channel.send("Please specify a role, text channel and an emoji");
    
    let role_id = null;
    if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];

    let emoji = null;
    if(/<:(\w+):(\d+)>/ig.exec(args.join(" ")))
        emoji = { name: /<:(\w+):(\d+)>/ig.exec(args.join(" "))[1], id: /<:(\w+):(\d+)>/ig.exec(args.join(" "))[2] };

    if(emoji) {
        if(!bot.emojis.resolve(emoji.id)) 
            return message.channel.send("Fireside doesn't have access to that emoji. For reliability, use an emoji from this server");
    }

    if(role_id) args.splice(args.indexOf(`<@&${role_id}>`), 1);
    if(channel_id) args.splice(args.indexOf(`<#${channel_id}>`), 1);
    if(emoji) args.splice(args.indexOf(`<:${emoji.name}:${emoji.id}>`), 1);

    let roleReaction_id = null;
    if(!Number.isInteger(parseInt(args[1], 10))) {
        console.log(args[1]);
        return message.channel.send('Invalid Role Reaction ID');
    }

    roleReaction_id = parseInt(args[1], 10);
    args.splice(1, 1);

    let title = null;
    let description = null;
    if(args[1]) {
        args.splice(0, 1);
        if(/(.*)?-d(.*)/ig.exec(args.join(" "))) {
            title = /(.*)?-d(.*)/ig.exec(args.join(" "))[1].trim();
            description = /(.*)?-d(.*)/ig.exec(args.join(" "))[2].trim();
        }
        else if(!/(.*)?-d(.*)/ig.exec(args.join(" "))) 
            title = args.join(" ");
    }

    roleReactionsController.getOne(bot, message, "EditRoleReaction", roleReaction_id, handleEditRoleReaction, () => {
        return message.channel.send("Invalid Role Reaction ID");
    });

    async function handleEditRoleReaction(roleReaction) {
        console.log("Inside Here");
        if(roleReaction.guild_id !== message.guild.id)
            return message.channel.send("Invalid Role Reaction ID");

        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0xff0080)
        .setTitle(title ? title : roleReaction.title)
        .setDescription(description ? description : roleReaction.description)

        let channel = bot.channels.resolve(roleReaction.channel_id);
        let reactionMessage = await channel.messages.fetch(roleReaction.message_id);

        if(title || emoji) reactionMessage.edit(embed).then(msg => handleMsg(msg, roleReaction));
    };

    

    async function handleMsg(msg, roleReaction) {
        if(emoji) {
            await msg.reactions.removeAll();
            await msg.react(`<:${emoji.name}:${emoji.id}`);
        }
        let data = {
            id: roleReaction.id,
            guild_id: message.guild.id,
            message_id: msg.id,
            channel_id: channel_id ? channel_id : roleReaction.channel_id,
            role_id: role_id ? role_id : roleReaction.role_id,
            emoji_id: emoji ? emoji.id : roleReaction.emoji_id,
            title: title ? title : roleReaction.title,
            description: description ? description : roleReaction.description
        };

        roleReactionsController.update(bot, message, "CreateRoleReaction", data, () => {
            return message.channel.send("Role Reaction Edited");
        });
    };
};

module.exports.config = {
    name: 'editrolereaction',
    d_name: 'EditRoleReaction',
    aliases: ['editrr', 'urr'],
    params: { required: true, params: 'Role ID' },
    flags: ['-d'],
    category: 'Admin',
    desc: `Updates an existing Role Reaction`,
    example: `editrolereaction 86 @New Role`
};