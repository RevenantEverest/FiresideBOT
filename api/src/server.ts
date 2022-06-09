import "reflect-metadata";

import dotenv from 'dotenv';

import AppDataSource from './db/dataSource.js';
import waitForPostgres from './db/waitForPostgres.js';
import bot from './discordBot.js';
import initializeApp from './app.js';

import { logs, colors } from './utils/index.js';

dotenv.config();

(async function main() {
    await waitForPostgres(AppDataSource);

    bot.login(process.env.DISCORD_KEY);

    const PORT = process.env.API_PORT || 3001;

    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-API: Listening on port ${PORT}` });
    });
})();

