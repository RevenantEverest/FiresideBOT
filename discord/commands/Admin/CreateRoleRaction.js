const Discord = require('discord.js');
const roleReactionsController = require('../../controllers/dbControllers/roleReactionsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1] || !args[2] || !args[3]) return message.channel.send("Please specify a role, text channel and an emoji");
    
    let role_id = null;
    if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Role you'd like server members who react to the embed to be given");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the Role Embed to be posted in");

    let emoji = null;
    if(/<:(\w+):(\d+)>/ig.exec(args.join(" ")))
        emoji = { name: /<:(\w+):(\d+)>/ig.exec(args.join(" "))[1], id: /<:(\w+):(\d+)>/ig.exec(args.join(" "))[2] };
    else return message.channel.send("Please specify an emoji you'd like server memebers to react with");

    if(!bot.emojis.resolve(emoji.id)) 
        return message.channel.send("Fireside doesn't have access to that emoji. For reliability, use an emoji from this server");

    args.splice(args.indexOf(`<@&${role_id}>`), 1);
    args.splice(args.indexOf(`<#${channel_id}>`), 1);
    args.splice(args.indexOf(`<:${emoji.name}:${emoji.id}>`), 1);

    if(args[1]) args.splice(0, 1);

    let title = null;
    let description = null;
    if(args[1] && /(.*)?-d(.*)/ig.exec(args.join(" "))) {
        title = /(.*)?-d(.*)/ig.exec(args.join(" "))[1].trim();
        description = /(.*)?-d(.*)/ig.exec(args.join(" "))[2].trim();
    }
    else if(args[1] && !/(.*)?-d(.*)/ig.exec(args.join(" "))) 
        title = args.join(" ");

    let embed = new Discord.MessageEmbed();
    let role = message.guild.roles.resolve(role_id);

    embed
    .setColor(0xff0080)
    .setTitle(title ? title : role.name)
    .setDescription(description ? description : `React below with the ${emoji.name} (<:${emoji.name}:${emoji.id}>) icon to gain access to the ${role.name}`)

    let channel = bot.channels.resolve(channel_id);
    channel.send(embed)
    .then(msg => handleMsg(msg))
    .catch(err => console.error(err));

    async function handleMsg(msg) {
        await msg.react(`<:${emoji.name}:${emoji.id}`);
        let data = {
            guild_id: message.guild.id,
            message_id: msg.id,
            channel_id: channel_id,
            role_id: role_id,
            emoji_id: emoji.id,
            title: title ? title : role.name,
            description: description ? description : `React below with the ${emoji.name} (<:${emoji.name}:${emoji.id}>) icon to gain access to the ${role.name}`
        };

        roleReactionsController.getByGuildIdAndRoleId(bot, message, "CreateRoleReaction", data, handleRoleReactionExists, () => {
            roleReactionsController.save(bot, message, "CreateRoleReaction", data, () => {
                return message.channel.send("Role Reaction Created");
            });
        });
    };

    async function handleRoleReactionExists(roleReaction) {
        return message.channel.send(`Role reaction already exists with ID **${roleReaction.id}**`);
    };
};

module.exports.config = {
    name: 'createrolereaction',
    d_name: 'CreateRoleReaction',
    aliases: ['crr'],
    params: { required: true, params: '@Role Tag, #text-channel-tag, emoji, optional title of embed, optional overwritable description' },
    category: 'Admin',
    desc: `Creates a new role embed in which when a member reacts to it, they'll receive that role`,
    example: `createrolereaction @Gamers #general ❤️ React to this if you're a true gamer -d Taking this role will grant access to gaming channels`
};