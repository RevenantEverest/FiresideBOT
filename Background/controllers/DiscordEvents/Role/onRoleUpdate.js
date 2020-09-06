const Discord = require('discord.js');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, oldRole, newRole) => {
    logSettingsController.getLogSettings(oldRole.guild.id, handleLogEmbed);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        else if(!settings.role_delete) return;

        let permissions = await bot.channels.resolve(settings.channel_id).permissionsFor(bot.user);
        if(!permissions) return;
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        if(oldRole.name === "@everyone" || newRole.name === "@everyone") return;
        if(oldRole.rawPosition !== newRole.rawPosition) return;
        let audit = await bot.guilds.resolve(newRole.guild.id).fetchAuditLogs();
        let executor = audit.entries.array()[0].executor;
        
        let infoText = '';

        if(oldRole.color !== newRole.color) infoText += `**Color**: ${newRole.hexColor}\n`;
        if(oldRole.name !== newRole.name) infoText += `**New Role Name**: ${newRole.name}\n`;
        if(oldRole.mentionable !== newRole.mentionable) infoText += `**Mentionable**: ${newRole.mentionable ? 'Yes' : 'No'}\n`;
        if(oldRole.permissions !== newRole.permissions) infoText += `**Permissions Changed**: Yes \n`;

        let embed = new Discord.MessageEmbed();
        embed
        .setColor(0xff9900)
        .setAuthor(`Role Updated by ${executor.username}#${executor.discriminator}`, executor.avatarURL({ dynamic: true }) ? executor.avatarURL({ dynamic: true }) : "https://i.imgur.com/CBCTbyK.png")
        .setDescription(`**Old Role Name**: ${oldRole.name} \n\n`+ infoText)
        .setFooter(`Role ID: ${newRole.id}`)

        bot.channels.resolve(settings.channel_id).send(embed);
    };
};