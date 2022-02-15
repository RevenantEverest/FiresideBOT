import "reflect-metadata";
import dbConfig from "./config/dbConfig.js";

import dotenv from 'dotenv';
import typeorm from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import chalk from 'chalk';

dotenv.config();

typeorm.createConnection(dbConfig)
.then(connection => {
    const PORT = process.env.API_PORT || 3001;
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.listen(PORT, () => {
        return console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` Fireside-API: Listening on port ${process.env.API_PORT}`)
    });
})
.catch(err => console.error(err));

