import Discord, { ClientOptions } from 'discord.js';
import { AutoPoster } from 'topgg-autoposter';

import { ENV } from './constants/index.js';
import { colors, logs } from './utils/index.js';

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

bot.on("ready", async () => {

    if(ENV.IS_DEV) {
        return logs.log({ color: colors.success, message: "Discord bot ready" });
    }

    logs.postToLogsChannel({ bot: bot, color: colors.success, title: "API Ready" });
});

bot.on("error", async (err:Error) => {

    const message = "CLIENT ERROR - API";
    
    logs.error({ color: colors.error, err, message: message });

    if(ENV.IS_DEV) return;

    logs.postToLogsChannel({ bot: bot, color: colors.error, title: "CLIENT ERROR - API" });
});

/* Top.gg AutoPoster events */
if(autoPoster) {
    autoPoster.on("posted", async () => {

        const title = "Top.gg Stats Posted";

        if(ENV.IS_DEV) {
            return logs.log({ color: colors.warning, type: "TOPGG", message: title });
        }

        logs.postToLogsChannel({ bot: bot, color: colors.topgg, title: title });
    });

    autoPoster.on("error", async (err: Error) => {

        const message = "Top.gg AutoPoster Error";

        logs.error({ color: colors.error, err, message: message });

        if(ENV.IS_DEV) return;

        logs.postToLogsChannel({ bot: bot, color: colors.error, title: message });
    });
};

export default bot;