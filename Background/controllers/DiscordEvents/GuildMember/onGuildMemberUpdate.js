const Discord = require('discord.js');
const utils = require('../../../utils/utils');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, oldMember, newMember) => {
    logSettingsController.getLogSettings(oldMember.guild.id, handleLogEmbed);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        
        let permissions = new Discord.Permissions(bot.channels.get(settings.channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let audit = await bot.guilds.get(newMember.guild.id).fetchAuditLogs();
        let executor = audit.entries.array()[0].executor;

        let embed = new Discord.RichEmbed();
        let updateText = `**${newMember.user.username}** #${newMember.user.discriminator} ${oldMember.nickname ? `(${oldMember.nickname})` : ''}\n\n`;

        if(oldMember.nickname !== newMember.nickname)
            if(!oldMember.nickname) updateText += `**New Nickname**: ${newMember.nickname}\n`;
            else if(newMember.nickname) updateText += `**Nickname Update**: ${newMember.nickname}\n`;
            else if(!newMember.nickname) updateText += `**Nickname Removed**\n`;
        
        if(oldMember._roles.length < newMember._roles.length)
            updateText += `**New Role**: <@&${await utils.arrDifference(oldMember._roles, newMember._roles)}>`;
        else if(oldMember._roles.length > newMember._roles.length)
            updateText += `**Removed Role**: <@&${await utils.arrDifference(oldMember._roles, newMember._roles)}>`;

        embed
        .setAuthor(`Member Updated by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.png?size=2048`)
        .setFooter(`User ID: ${newMember.user.id}`)
        .setColor(0xff9900)
        .setDescription(updateText)

        bot.channels.get(settings.channel_id).send(embed);
    };
};