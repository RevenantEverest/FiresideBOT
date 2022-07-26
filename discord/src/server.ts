import play from 'play-dl';

import bot from './discordBot.js';
import initializeApp from './app.js';
import setCommands from './config/setCommands.js';

import { ENV } from './constants/index.js';
import { logs, colors } from './utils/index.js';

(async function main() {

    await setCommands();
    await play.setToken({
        youtube: {
            cookie: ENV.YOUTUBE_COOKIE
        }
    })

    bot.login(ENV.DISCORD.KEY);

    const PORT = ENV.DISCORD_PORT || 3002;
    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-Discord: Listening on port ${PORT}` });
    });
})();