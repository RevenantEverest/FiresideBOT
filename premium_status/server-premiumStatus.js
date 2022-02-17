require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PREMIUMSTATUS_PORT || 3008;

const Discord_Bot = require('./Discord_Bot');
Discord_Bot.login(process.env.DISCORD_KEY);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

app.use("/donator", require('./routes/donatorRoutes'));

app.use("/", (req, res) => res.json({ message: "FiresideBOT" }));

app.listen(PORT, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) + ` FiresideBOT: Listening on port ${PORT}`));