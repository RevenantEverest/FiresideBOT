const Discord = require('discord.js');

const logSettingsDB = require('../../../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, emoji) => {
    let audit = await bot.guilds.get(emoji.guild.id).fetchAuditLogs();
    let executor = audit.entries.array()[0].executor;

    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xff0000)
    .setAuthor(`Emoji Deleted by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
    .setDescription(`**Name**: ${emoji.name}`)
    .setFooter(`Emoji ID: ${emoji.id}`)

    logSettingsDB.findByGuildId(emoji.guild.id)
    .then(settings => bot.channels.get(settings.channel_id).send(embed))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};