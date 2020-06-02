const Discord = require('discord.js');
const streamerRolesController = require('./streamerRolesController');
const currentLive = [];
const services = {};

async function arrayObjectIndex(arr, guild_id, discord_id) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].guild_id === guild_id && arr[i].discord_id)
            return i;
    }
};

services.checkLive = async (bot) => {
    streamerRolesController.getByEnabled(streamerRoles => {
        streamerRoles.forEach(async el => {
            // let guild = await bot.guilds.cache.array().filter(g => g.id === el.guild_id) || null;
            let guild = await bot.guilds.resolve(el.guild_id) || null;
            if(guild) return handleIsStreaming(guild, el);
        });
    });

    async function handleIsStreaming(guild, settings) {
        if(!settings.role_id || settings.role_id === "none") return;
        if(!guild.me.hasPermission("SEND_MESSAGES")) return;
        if(!guild.me.hasPermission("MANAGE_ROLES")) return;
        
        let guildMembers = guild.members.cache.array().filter(el => el.presence.activities);
        let isStreaming = guildMembers.filter(el => el.presence.activities.map(a => a.name).includes("Twitch"));
        let guildCurrentLive = currentLive.filter(el => el.guild_id === guild.id); 

        isStreaming.forEach(el => {
            if(guildCurrentLive.map(el => el.discord_id).includes(el.user.id)) return;

            el.roles.add(settings.role_id, 'Fireside isLive Role')
            .catch(err => console.error(err));

            currentLive.push({ guild_id: guild.id, discord_id: el.user.id, member: el });
        });

        guildCurrentLive.forEach(async el => {
            if(isStreaming.map(streamingUser => streamingUser.user.id).includes(el.discord_id)) return;

            let index = await arrayObjectIndex(currentLive, guild.id, el.discord_id);
            currentLive.splice(index, 1);

            el.member.roles.remove(settings.role_id, 'Fireside isLive Role')
            .catch(err => console.error(err));
        });
    };
};

services.persistence = async (bot) => {

    let guilds = bot.guilds.cache.array();

    guilds.forEach(guild => {
        streamerRolesController.getByGuildId(guild, streamerRole => {
            checkIsStreaming(guild, streamerRole);
        });
    });

    async function checkIsStreaming(guild, settings) {
        if(!settings.role_id || settings.role_id === "none") return;

        let botMember = await guild.me;
        if(!botMember.hasPermission("SEND_MESSAGES")) return;
        if(!botMember.hasPermission("MANAGE_ROLES")) return;
        
        let guildMembers = guild.members.cache.array();
        let isStreaming = guildMembers.filter(el => el.presence.game).filter(el => el.presence.game.name === "Twitch");
        let membersWithRole = guildMembers.filter(el => el._roles.includes(settings.role_id));

        membersWithRole.forEach(el => {
            if(isStreaming.map(streamingUser => streamingUser.user.id).includes(el.id)) return;

            el.roles.remove(settings.role_id, 'Fireside isLive Role')
            .catch(err => console.error(err));
        });
    };
};

module.exports = services;