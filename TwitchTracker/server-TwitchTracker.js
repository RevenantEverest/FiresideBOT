require('dotenv').config();

/* Dependencies */
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const memwatch = require('node-memwatch');

const app = express();
const PORT = 4000;

const Discord_Bot = require('./Discord_Bot');
Discord_Bot.login(process.env.DISCORD_KEY);

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

/* Routes */


/* Default Routes */
app.use("/", (req, res) => res.json({ message: "Fireside-TwitchTracker" }));

/* PROD */
let server = http.createServer(app);
server.listen(PORT, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` Fireside-API: Listening on port ${PORT}`));

memwatch.on('leak', async (info) => {
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xcc0000)
    .addField(
        '⚠️ Memory Leak Detected ⚠️', 
        `A memory leak has been detected in the **Twitch Tracker** Service\n\n` + 
        `**Reason:** ${info.reason}\n\n` +
        `**Growth:** ${info.growth}`
    )
    .setFooter(await utils.getDate())
    Discord_Bot.channels.get("543862697742172179").send(embed);
});