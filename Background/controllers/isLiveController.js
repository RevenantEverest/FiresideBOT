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
        streamerRoles.forEach(el => {
            let guild = bot.guilds.get(el.guild_id) || null;
            if(guild) return handleIsStreaming(guild, el);
        });
    });

    async function handleIsStreaming(guild, settings) {
        if(!settings.role_id || settings.role_id === "none") return;

        let botMember = await guild.fetchMember(bot.user)
        if(!botMember.hasPermission("SEND_MESSAGES")) return;
        if(!botMember.hasPermission("MANAGE_ROLES")) return;
        
        let guildMembers = guild.members.array();
        let isStreaming = guildMembers.filter(el => el.presence.game).filter(el => el.presence.game.name === "Twitch");
        let guildCurrentLive = currentLive.filter(el => el.guild_id === guild.id); 

        isStreaming.forEach(el => {
            if(guildCurrentLive.includes(el.user.id)) return;

            el.addRole(settings.role_id, 'Fireside isLive Role')
            .catch(err => console.error(err));

            currentLive.push({ guild_id: guild.id, discord_id: el.user.id, member: el });
        });

        guildCurrentLive.forEach(async el => {
            if(isStreaming.map(streamingUser => streamingUser.user.id).includes(el.discord_id)) return;

            let index = await arrayObjectIndex(currentLive, guild.id, el.discord_id);
            currentLive.splice(index, 1);

            el.member.removeRole(settings.role_id, 'Fireside isLive Role')
            .catch(err => console.error(err));
        });
    };
};

services.persistence = async (bot) => {

    let guilds = bot.guilds.array();

    guilds.forEach(guild => {
        streamerRolesController.getByGuildId(guild, streamerRole => {
            checkIsStreaming(guild, streamerRole);
        });
    });

    async function checkIsStreaming(guild, settings) {
        if(!settings.role_id || settings.role_id === "none") return;

        let botMember = await guild.fetchMember(bot.user)
        if(!botMember.hasPermission("SEND_MESSAGES")) return;
        if(!botMember.hasPermission("MANAGE_ROLES")) return;
        
        let guildMembers = guild.members.array();
        let isStreaming = guildMembers.filter(el => el.presence.game).filter(el => el.presence.game.name === "Twitch");
        let membersWithRole = guildMembers.filter(el => el._roles.includes(settings.role_id));

        membersWithRole.forEach(el => {
            if(isStreaming.map(streamingUser => streamingUser.user.id).includes(el.id)) return;

            el.removeRole(settings.role_id, 'Fireside isLive Role')
            .catch(err => console.error(err));
        });
    };
};

module.exports = services;
    /*
        Create separate function that checks the role_id for settings to see if anyone who has it isn't live anymore
        This creates a makeshift persistence layer so there isn't a need for DB table
        Have this function run on Discord event onReady
    */