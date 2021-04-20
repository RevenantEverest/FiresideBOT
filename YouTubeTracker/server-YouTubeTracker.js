require('dotenv').config();

/* Dependencies */
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 4001;

const bot = require('./Discord_Bot');
bot.login(process.env.DISCORD_KEY);

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

/* Default Routes */
app.use("/", (req, res) => res.json({ message: "Fireside-YouTubeTracker" }));

/* PROD */
let server = http.createServer(app);
server.listen(PORT, () => console.log(chalk.hex("#00ff00")('[HTTP]') + ` Fireside-API: Listening on PORT ${PORT}`));