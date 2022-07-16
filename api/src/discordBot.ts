import Discord, { ClientOptions, Emoji, Message, Guild, Role } from 'discord.js';
import { AutoPoster } from 'topgg-autoposter';

import { 
    PotentialMessage, 
    PotentialMessageReaction,
    PotentialDiscordUser
} from './types/discordEvents.js';

import { 
    onReady, 
    onError,
    onMessageCreate,
    onMessageDelete,
    onMessageReactionAdd,
    onMessageReactionRemove,
    onRoleCreate,
    onRoleUpdate,
    onRoleDelete,
    onEmojiCreate,
    onEmojiUpdate,
    onEmojiDelete,
    onGuildCreate
} from './controllers/discordEvents/index.js';
import * as topggEvents from './controllers/topggEvents/index.js';

import { ENV } from './constants/index.js';

const options:ClientOptions = {
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
const autoPoster = !ENV.IS_DEV ? AutoPoster(ENV.TOPGG_TOKEN, bot, { interval: 7200000 }) : null;

bot.on("ready", async () => onReady(bot));
bot.on("error", async (err: Error) => onError(bot, err));

bot.on("messageCreate", async (message: Message) => onMessageCreate(bot, message));
bot.on("messageDelete", async (message: PotentialMessage) => onMessageDelete(bot, message));

bot.on("messageReactionAdd", async (message: PotentialMessageReaction, user: PotentialDiscordUser) => {
    return onMessageReactionAdd(bot, message, user);
});
bot.on("messageReactionRemove", async (message: PotentialMessageReaction, user: PotentialDiscordUser) => {
    return onMessageReactionRemove(bot, message, user);
});

bot.on("guildCreate", async (guild: Guild) =>  onGuildCreate(bot, guild));

bot.on("roleCreate", async (role: Role) => onRoleCreate(bot, role));
bot.on("roleUpdate", async (role: Role) => onRoleUpdate(bot, role));
bot.on("roleDelete", async (role: Role) => onRoleDelete(bot, role));

bot.on("emojiCreate", async (emoji: Emoji) => onEmojiCreate(bot, emoji));
bot.on("emojiUpdate", async (emoji: Emoji) => onEmojiUpdate(bot, emoji));
bot.on("emojiDelete", async (emoji: Emoji) => onEmojiDelete(bot, emoji));

/* Top.gg AutoPoster events */
if(autoPoster) {
    autoPoster.on("posted", async () => topggEvents.onPosted(bot));
    autoPoster.on("error", async (err: Error) => topggEvents.onError(bot, err));
};

export default bot;