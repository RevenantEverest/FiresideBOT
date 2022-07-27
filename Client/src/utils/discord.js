const services = {};

services.guildIconUrl = (guild) => {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
};

services.avatarUrl = (user) => {
    return `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png`;
};

export default services;