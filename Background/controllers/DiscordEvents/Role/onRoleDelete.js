const Discord = require('discord.js');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, role) => {
    logSettingsController.getLogSettings(role.guild.id, handleLogEmbed);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        else if(!settings.role_delete) return;

        if(role.name === bot.user.username) return;
        
        let permissions = await bot.channels.resolve(settings.channel_id).permissionsFor(bot.user);
        if(!permissions) return;
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let audit = await bot.guilds.resolve(role.guild.id).fetchAuditLogs();
        let executor = audit.entries.array()[0].executor;

        let embed = new Discord.MessageEmbed();
        embed
        .setColor(0xff0000)
        .setAuthor(`Role Deleted by ${executor.username}#${executor.discriminator}`, executor.avatarURL() ? executor.avatarURL() : "https://i.imgur.com/CBCTbyK.png")
        .setDescription(`**Role:** ${role.name}`)
        .setFooter(`Role ID: ${role.id}`)

        bot.channels.resolve(settings.channel_id).send(embed);
    };
};