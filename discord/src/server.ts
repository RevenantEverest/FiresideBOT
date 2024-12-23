import bot from './discordBot.js';
import initializeApp from './app.js';
import setCommands from './config/setCommands/index.js';
import getUserCount from './config/getUserCount/index.js';
import setBotActivity from './config/setBotActivity/index.js';

import { ENV } from './constants/index.js';
import { logs, colors, promises } from './utils/index.js';

(async function main() {

    await setCommands();

    bot.login(ENV.DISCORD.KEY);

    await promises.waitFor(() => bot.isReady(), {
        retries: 10,
        intervalLength: 2000
    });

    getUserCount();
    setInterval(getUserCount, 5 * 60000);

    setBotActivity();

    const PORT = ENV.DISCORD_PORT || 3002;
    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-Discord: Listening on port ${PORT}` });
    });
})();