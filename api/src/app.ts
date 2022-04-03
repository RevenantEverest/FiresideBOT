import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { verifyToken } from './middleware/index.js';
import { authRoutes, playlistRoutes, webhookRoutes } from './routes/index.js';

function initializeApp(): Application {
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.use("/auth", authRoutes);
    app.use("/playlists", verifyToken, playlistRoutes);
    app.use("/webhooks", webhookRoutes);

    return app;
};

export default initializeApp;