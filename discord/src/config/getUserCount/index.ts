import config from '../index.js';
import bot from '../../discordBot.js';

async function getUserCount() {

    const isReady = bot.isReady();
    if(!isReady) return;

    const botGuilds = await bot.guilds.fetch();

    let users = 0;
    for(let i = 0; i < botGuilds.size; i++) {
        const oauthGuild = botGuilds.at(i);

        if(!oauthGuild) return;

        const guild = await oauthGuild.fetch();
        users += guild.memberCount;
    };

    config.userCount = users;
    config.guildCount = botGuilds.size;
};

export default getUserCount;
