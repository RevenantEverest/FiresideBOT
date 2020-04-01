const Discord = require('discord.js');
const currencyRecordsDB = require('../../../models/currencyRecordsDB');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, member) => {
    if(member.user.bot) return;
    else logSettingsController.getLogSettings(member.guild.id, deleteCurrencyRecord);

    async function deleteCurrencyRecord(settings) {
        logSettings = settings;
        currencyRecordsDB.delete(member.id)
        .then(() => handleLogEmbed(settings))
        .catch(err => console.error(err));
    };

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        
        let permissions = new Discord.Permissions(bot.channels.get(settings.channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let auditLogs = await bot.guilds.get(member.guild.id).fetchAuditLogs();
        let audit = auditLogs.entries.array()[0];
        let embed = new Discord.RichEmbed();

        if(audit.action === "MEMBER_KICK") {
            embed
            .setAuthor(
                `Member Kicked by ${audit.executor.username}#${audit.executor.discriminator}`, 
                `https://cdn.discordapp.com/avatars/${audit.executor.id}/${audit.executor.avatar}.png?size=2048`
            )
            if(audit.reason)
                embed.setDescription(`**Reason**: ${audit.reason}`)
        }
        else embed.setAuthor(`Member Left`, member.user.avatarURL)

        embed
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`)
        .setColor(0xff0000)
        .setTitle(`${member.user.username}#${member.user.discriminator}`)
        .setFooter(`User ID: ${member.user.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    };
};