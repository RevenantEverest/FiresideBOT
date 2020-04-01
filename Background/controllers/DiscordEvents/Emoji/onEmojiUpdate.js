const Discord = require('discord.js');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, oldEmoji, newEmoji) => {
    logSettingsController.getLogSettings(oldEmoji.guild.id, handleLogEmbed);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        
        let permissions = new Discord.Permissions(bot.channels.get(settings.channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let audit = await bot.guilds.get(oldEmoji.guild.id).fetchAuditLogs();
        let executor = audit.entries.array()[0].executor;

        let infoText = '';

        if(oldEmoji.name !== newEmoji.name) infoText += `**New Name**: ${newEmoji.name}\n`;

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff9900)
        .setAuthor(`Emoji Updated by ${executor.username}#${executor.discriminator}`, executor.avatarURL ? executor.avatarURL : "https://i.imgur.com/CBCTbyK.png")
        .setDescription(`**Emoji**: <:${oldEmoji.name}:${oldEmoji.id}>\n\n**Old Name**: ${oldEmoji.name}\n`+ infoText)
        .setFooter(`Emoji ID: ${oldEmoji.id}`)
        
        bot.channels.get(settings.channel_id).send(embed);
    }
};