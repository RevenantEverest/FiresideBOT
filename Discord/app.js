/* Dependencies */
const fs = require('fs');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

/* Routes */


/* Default Routes */
app.use("/", (req, res) => res.json({ message: "FiresideBOT" }));

/* PROD */
let server = http.createServer(app);
server.listen(3001, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` FiresideBOT: Listening on port 3001`));

// const Twitch_Bot = require('./Twitch/Twitch_Bot');

// Twitch_Bot.connect();

module.exports = server;