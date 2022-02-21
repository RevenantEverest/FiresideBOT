import Discord, { ClientOptions } from 'discord.js';
import { AutoPoster } from 'topgg-autoposter';

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
const topggToken = process.env.TOPGG_TOKEN as string;
const autoPoster = process.env.ENVIRONMENT !== "DEV" ? AutoPoster(topggToken, bot, { interval: 7200000 }) : null;

bot.on("ready", async () => {

    if(process.env.ENVIRONMENT === "DEV") {
        return logs.log({ color: colors.success, message: "Discord bot ready" });
    }

    logs.postToLogsChannel({ bot: bot, color: colors.success, title: "API Ready" });
});

bot.on("error", async (err:Error) => {

    console.error(err);

    if(process.env.ENVIRONMENT === "DEV") return;

    logs.postToLogsChannel({ bot: bot, color: colors.error, title: "CLIENT ERROR - API" });
});

/* Top.gg AutoPoster events */
if(autoPoster) {
    autoPoster.on("posted", async () => {

        const title = "Top.gg Stats Posted";

        if(process.env.ENVIRONMENT === "DEV") {
            return logs.log({ color: colors.warning, type: "TOPGG", message: title });
        }

        logs.postToLogsChannel({ bot: bot, color: colors.topgg, title: title });
    });

    autoPoster.on("error", async (err) => {

        console.error(err);

        if(process.env.ENVIRONMENT === "DEV") return;

        logs.postToLogsChannel({ bot: bot, color: colors.error, title: "Top.gg AutoPoster Error" });
    });
};

export default bot;