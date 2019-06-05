/* Dependencies */
const fs = require('fs');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3006;

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

/* Routes */
app.use("/status", require("./routes/statusCheckerRoutes"));

/* Default Routes */
app.use("/", (req, res) => res.json({ message: "FiresideBOT" }));

/* PROD */
let server = http.createServer(app);
server.listen(PORT, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` FiresideBOT: Listening on port ${PORT}`));

// const Twitch_Bot = require('./Twitch/Twitch_Bot');

// Twitch_Bot.connect();

module.exports = server;