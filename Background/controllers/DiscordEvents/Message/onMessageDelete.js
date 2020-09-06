const roleReactionsController = require('../../roleReactionsController');
const logSettingsController = require('../../logSettingsController');
const Discord = require('discord.js');

module.exports = async (bot, message) => {
    /*
    
        Check Message against RoleReactions message_id

    */

    roleReactionsController.getByGuildIdAndMessageId({ guild_id: message.guild.id, message_id: message.id }, handleRoleReactionDelete);

    async function handleRoleReactionDelete(roleReaction) {
        roleReactionsController.delete(roleReaction.id);

        let permissions = bot.channels.resolve(roleReaction.channel_id).permissionsFor(bot.user);
        if(!permissions) return;
        if(!permissions.has("ADMINISTRATOR")) {
            if(!permissions.has("VIEW_AUDIT_LOG")) return;
        }

        let guild = bot.guilds.resolve(message.guild.id);
        let auditLogs = await guild.fetchAuditLogs();
        let executor = auditLogs.entries.array()[0].executor;

        logSettingsController.getLogSettings(message.guild.id, (settings) => {
            if(!settings.enabled) return;

            let role = guild.roles.resolve(roleReaction.role_id);
            let embed = new Discord.MessageEmbed();

            embed
            .setColor(0xff0000)
            .setAuthor(`${executor.username} #${executor.discriminator} deleted a role reaction embed`, executor.avatarURL({ dynamic: true }))
            .setDescription(`The Role Reaction embed for @${role.name}`)
            .setThumbnail(executor.avatarURL({ dynamic: true }))
            .setFooter(`Role ID: ${role.id}`)

            bot.channels.resolve(settings.channel_id).send(embed);
        });
    };
};