const Discord = require('discord.js');
const currencyRecordsDB = require('../../../models/currencyRecordsDB');
const logSettingsController = require('../../logSettingsController');
const currencyController = require('../../currencyController');
const ranksController = require('../../ranksController');

module.exports = async (bot, member) => {
    if(member.user.bot) return;
    else logSettingsController.getLogSettings(member.guild.id, handleLogEmbed);

    currencyController.removeRecord(member);
    ranksController.deleteRankRecord(member);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        
        let permissions = await bot.channels.resolve(settings.channel_id).permissionsFor(bot.user);
        if(!permissions) return;
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let auditLogs = await bot.guilds.resolve(member.guild.id).fetchAuditLogs();
        let audit = auditLogs.entries.array()[0];
        let embed = new Discord.MessageEmbed();

        if(audit.action === "MEMBER_KICK") {
            embed
            .setAuthor(
                `Member Kicked by ${audit.executor.username}#${audit.executor.discriminator}`, 
                audit.executor.avatarURL({ dynamic: true }) ? audit.executor.avatarURL({ dynamic: true }) : "https://i.imgur.com/CBCTbyK.png"
            )
            if(audit.reason)
                embed.setDescription(`**Reason**: ${audit.reason}`)
        }
        else embed.setAuthor(`Member Left`, member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : "https://i.imgur.com/CBCTbyK.png")

        embed
        .setThumbnail(member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : "https://i.imgur.com/CBCTbyK.png")
        .setColor(0xff0000)
        .setDescription(`**Member:** ${member.user.username}#${member.user.discriminator}`)
        .setFooter(`Member ID: ${member.user.id}`)

        bot.channels.resolve(settings.channel_id).send(embed);
    };
};