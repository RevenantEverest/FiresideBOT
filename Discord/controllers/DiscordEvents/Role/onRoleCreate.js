const Discord = require('discord.js');

const logSettingsDB = require('../../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, role) => {
    let audit = await bot.guilds.get(role.guild.id).fetchAuditLogs();
    let executor = audit.entries.array()[0].executor;

    logSettingsDB.findByGuildId(role.guild.id)
    .then(settings => {
        if(!settings.enabled) return;

        let embed = new Discord.RichEmbed();

        embed
        .setColor(0x00ff00)
        .setAuthor(`Role Created by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setFooter(`ID: ${role.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};