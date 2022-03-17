const Discord = require('discord.js');
const logSettingsController = require('../../logSettingsController');
const newMemberMessagesController = require('../../newMemberMessagesController');
const welcomeMessageDB = require('../../../models/welcomeMessageDB');
const autoRoleDB = require('../../../models/autoRoleDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, member) => {
    if(member.user.bot) return;
    
    logSettingsController.getLogSettings(member.guild.id, handleLogEmbed);

    newMemberMessagesController.getByGuildId(bot, member.guild, member);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;

        let permissions = await bot.channels.resolve(settings.channel_id).permissionsFor(bot.user);
        if(!permissions) return;
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;
        if(!permissions.has("MANAGE_ROLES")) return;

        let embed = new Discord.MessageEmbed();
        embed
        .setAuthor(`New Member ${member.user.username}#${member.user.discriminator}`, member.user.avatarURL({ dynamic: true }) ? member.user.avatarURL({ dynamic: true }) : "https://i.imgur.com/CBCTbyK.png")
        .setColor(0x00ff00)
        .setFooter(`Member ID: ${member.user.id}`)

        bot.channels.resolve(settings.channel_id).send(embed);
    };

    let welcomeMessage = null;
    let autoRole = null;
    await autoRoleDB.findByGuildId(member.guild.id)
    .then(aRole => autoRole = aRole.role_id)
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
    await welcomeMessageDB.findByGuildId(member.guild.id)
    .then(message => welcomeMessage = message.message)
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });

    if(welcomeMessage) member.user.send(welcomeMessage);
    if(autoRole) member.roles.add(autoRole, 'Fireside AutoRole').catch(err => {
        console.log(err.toString());
    });
};