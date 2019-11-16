const Discord = require('discord.js');

const logSettingsDB = require('../../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, oldEmoji, newEmoji) => {
    logSettingsDB.findByGuildId(oldEmoji.guild.id)
    .then(async settings => {
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
        .setAuthor(`Emoji Updated by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setDescription(`**Emoji**: <:${oldEmoji.name}:${oldEmoji.id}>\n\n**Old Name**: ${oldEmoji.name}\n`+ infoText)
        .setFooter(`Emoji ID: ${oldEmoji.id}`)
        
        bot.channels.get(settings.channel_id).send(embed)
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};