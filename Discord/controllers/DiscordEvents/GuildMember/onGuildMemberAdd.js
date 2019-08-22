const Discord = require('discord.js');

const logSettingsDB = require('../../../models/GuildModels/guildLogSettingsDB');
const welcomeMessageDB = require('../../../models/welcomeMessageDB');
const autoRoleDB = require('../../../models/autoRoleDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, member) => {
    if(member.user.bot) return;
    let welcomeMessage = null;
    let autoRole = null;
    await welcomeMessageDB.findByGuildId(member.guild.id)
    .then(message => welcomeMessage = message.message)
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
    await autoRoleDB.findByGuildId(member.guild.id)
    .then(aRole => autoRole = aRole.role_id)
    .catch(err => console.error(err));

    if(welcomeMessage) member.user.send(welcomeMessage);
    if(autoRole) member.addRole(autoRole, 'Fireside AutoRole').catch(err => console.error(err));

    logSettingsDB.findByGuildId(member.guild.id)
    .then(settings => {
        if(!settings) return;

        let embed = new Discord.RichEmbed();
        embed
        .setAuthor(`New Member ${member.user.username}#${member.user.discriminator}`, `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`)
        .setColor(0x00ff00)
        .setFooter(`ID: ${member.user.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};