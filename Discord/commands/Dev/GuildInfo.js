const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;

    let embed = new Discord.RichEmbed();
    let guild = bot.guilds.get(args[1]);

    embed
    .setColor(0xff66ff)
    .setThumbnail(guild.iconURL ? guild.iconURL : '')
    .setTitle("**Guild Info**")
    .addBlankField()
    .addField("Name:", guild.name, true)
    .addField("ID:", guild.id, true)
    .addField("Owner:", guild.owner, true)
    .addField("Region:", guild.region, true)
    .addField("Member Count:", guild.memberCount.toLocaleString(), true)

    console.log(guild.owner)

    message.channel.send(embed);
};

module.exports.config = {
    name: "guildinfo",
    d_name: "GuildInfo",
    aliases: ['gi'],
    category: "Dev"
};