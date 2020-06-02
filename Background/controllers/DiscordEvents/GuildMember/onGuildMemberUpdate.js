const Discord = require('discord.js');
const utils = require('../../../utils/utils');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, oldMember, newMember) => {
    logSettingsController.getLogSettings(oldMember.guild.id, handleLogEmbed);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        else if(!settings.member_nickname_change && !settings.member_role_change) return;

        let permissions = await bot.channels.resolve(settings.channel_id).permissionsFor(bot.user);
        if(!permissions) return;
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let auditLogs = await bot.guilds.resolve(newMember.guild.id).fetchAuditLogs();
        let audit = auditLogs.entries.array()[0];

        if(audit.reason)
            if(audit.reason === "Fireside isLive Role") return;

        let updateText = `**${newMember.user.username}** #${newMember.user.discriminator} ${oldMember.nickname ? `(${oldMember.nickname})` : ''}\n\n`;

        if(oldMember.nickname !== newMember.nickname) return handleNicknameChange(settings, audit, updateText);
        else if(oldMember._roles.length !== newMember._roles.length) return handleRoleChange(settings, audit, updateText);
    };

    async function handleNicknameChange(settings, audit, updateText) {
        if(!settings.member_nickname_change) return;

        if(!oldMember.nickname) updateText += `**New Nickname**: ${newMember.nickname}\n`;
        else if(newMember.nickname) updateText += `**Nickname Update**: ${newMember.nickname}\n`;
        else if(!newMember.nickname) updateText += `**Nickname Removed**\n`;

        return sendEmbed(settings, audit, updateText);
    };

    async function handleRoleChange(settings, audit, updateText) {
        if(!settings.member_role_change) return;

        if(oldMember._roles.length < newMember._roles.length)
            updateText += `**New Role**: <@&${await utils.arrDifference(oldMember._roles, newMember._roles)}>`;
        else if(oldMember._roles.length > newMember._roles.length)
            updateText += `**Removed Role**: <@&${await utils.arrDifference(oldMember._roles, newMember._roles)}>`;
        
        return sendEmbed(settings, audit, updateText);
    };

    async function sendEmbed(settings, audit, updateText) {
        let embed = new Discord.MessageEmbed();
        let executor = audit.executor;
        embed
        .setAuthor(`Member Updated by ${executor.username}#${executor.discriminator}`, executor.avatarURL() ? executor.avatarURL() : "https://i.imgur.com/CBCTbyK.png")
        .setThumbnail(newMember.user.avatarURL() ? newMember.user.avatarURL() : "https://i.imgur.com/CBCTbyK.png")
        .setFooter(`Member ID: ${newMember.user.id}`)
        .setColor(0xff9900)
        .setDescription(updateText)

        bot.channels.resolve(settings.channel_id).send(embed);
    }
};