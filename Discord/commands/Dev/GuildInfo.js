const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;

    let embed = new Discord.MessageEmbed();
    let guild = bot.guilds.resolve(args[1]);
    let memberCount = guild.members.cache.array().filter(el => !el.user.bot).length.toLocaleString();
    let botCount = guild.members.cache.array().filter(el => el.user.bot).length.toLocaleString()

    embed
    .setColor(0xff66ff)
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setAuthor(`Guild Info For ${guild.name}`, guild.iconURL({ dynamic: true }))
    .addField("Owner:", `${guild.owner.user.username} #${guild.owner.user.discriminator}`)
    .addField("Region:", guild.region, true)
    .addField("Member Count:", memberCount, true)
    .addField("Bot Count:", botCount, true)
    .setFooter(`ID: ${guild.id}`)

    message.channel.send(embed);
};

module.exports.config = {
    name: "guildinfo",
    d_name: "GuildInfo",
    aliases: ['gi'],
    category: "Dev"
};