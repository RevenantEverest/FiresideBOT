import dotenv from 'dotenv';
import bot from './discordBot.js';
import initializeApp from './app.js';

import { ENV } from './constants/index.js';
import { logs, colors } from './utils/index.js';

dotenv.config();

(async function main() {
    bot.login(process.env.DISCORD_KEY);

    const PORT = process.env.API_PORT || 3002;
    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-Discord: Listening on port ${PORT}` });
    });
})();