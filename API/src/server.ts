import "reflect-metadata";
import dbConfig from "./config/dbConfig.js";

import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import chalk from 'chalk';

import waitForPostgres from './db/waitForPostgres.js';

dotenv.config();

waitForPostgres(createConnection, dbConfig);

const PORT = process.env.API_PORT || 3001;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set("trust proxy", true);
app.set("trust proxy", "loopback");

app.listen(PORT, () => {
    return console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` Fireside-API: Listening on port ${PORT}`)
});

