import "reflect-metadata";
import { dbConfig } from "./config/index.js";

import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import waitForPostgres from './db/waitForPostgres.js';
import bot from './discordBot.js';

import { logs, colors } from './utils/index.js';
import { authRoutes, webhookRoutes } from './routes/index.js';

dotenv.config();

(async function main() {
    await waitForPostgres(createConnection, dbConfig);

    bot.login(process.env.DISCORD_KEY);

    const PORT = process.env.API_PORT || 3001;
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.use("/auth", authRoutes);
    app.use("/webhooks", webhookRoutes);

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-API: Listening on port ${PORT}` });
    });
})();

