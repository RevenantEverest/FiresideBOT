const Discord = require('discord.js');

const logSettingsDB = require('../../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, oldRole, newRole) => {
    logSettingsDB.findByGuildId(newRole.guild.id)
    .then(async settings => {
        if(!settings.enabled) return;

        let permissions = new Discord.Permissions(bot.channels.get(settings.channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        if(oldRole.name === "@everyone" || newRole.name === "@everyone") return;
        if(oldRole.position !== newRole.position) return;
        let audit = await bot.guilds.get(newRole.guild.id).fetchAuditLogs();
        let executor = audit.entries.array()[0].executor;
        
        let infoText = '';

        if(oldRole.color !== newRole.color) infoText += `**Color**: ${newRole.hexColor}\n`;
        if(oldRole.name !== newRole.name) infoText += `**Name**: ${newRole.name}\n`;
        if(oldRole.mentionable !== newRole.mentionable) infoText += `**Mentionable**: ${newRole.mentionable ? 'Yes' : 'No'}\n`;
        if(oldRole.permissions !== newRole.permissions) infoText += `**Permissions Changed**: Yes \n`;

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff9900)
        .setAuthor(`Role Updated by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setDescription(`**Role Name**: ${oldRole.name} \n\n`+ infoText)
        .setFooter(`Role ID: ${newRole.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};