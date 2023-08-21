import Discord, { ClientOptions } from 'discord.js';

import { onReady, onError } from './controllers/discordEvents/index.js';

const options: ClientOptions = {
    intents: [
        "GUILDS", 
        "GUILD_MEMBERS", 
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS"
    ]
};
const bot = new Discord.Client(options);

bot.on("ready", async () => onReady(bot));
bot.on("error", async (err: Error) => onError(bot, err));

export default bot;