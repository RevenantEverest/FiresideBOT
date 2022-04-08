import "reflect-metadata";
import { dbConfig } from "./config/index.js";

import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import waitForPostgres from './db/waitForPostgres.js';
import bot from './discordBot.js';
import initializeApp from './app.js';

import { logs, colors } from './utils/index.js';

dotenv.config();

(async function main() {
    await waitForPostgres(createConnection, dbConfig);

    bot.login(process.env.DISCORD_KEY);

    const PORT = process.env.API_PORT || 3001;

    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-API: Listening on port ${PORT}` });
    });
})();

