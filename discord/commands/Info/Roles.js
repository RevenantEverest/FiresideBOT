const Discord = require('discord.js');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let roles = message.guild.roles.cache.array().map(el => {
        return {id: el.id, name: el.name};
    });
    let embed = new Discord.MessageEmbed();
    let rolesStr = '';
    embed.setTitle(`**Roles**`).addField(`Number of Roles:`, roles.length);
    roles.forEach(el => {
        if(el.name !== '@everyone')
            rolesStr += `${el.name}\n`
    });
    embed.addField(`Roles:`, rolesStr);
    message.channel.send(embed);
};

module.exports.config = {
    name: 'roles',
    d_name: 'Roles',
    aliases: [],
    category: 'Info',
    desc: 'Displays availale Roles',
    example: 'roles'
};