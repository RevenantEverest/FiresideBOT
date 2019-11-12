require('dotenv').config();

const Discord = require('discord.js');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const memwatch = require('node-memwatch');
const utils = require('./utils/utils');

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

app.use("/", (req, res) => res.json({ message: "FiresideBOT" }));

app.listen(PORT, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) + ` FiresideBOT: Listening on port ${PORT}`));

memwatch.on('leak', async (info) => {
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xcc0000)
    .addField(
        '⚠️ Memory Leak Detected ⚠️', 
        `A memory leak has been detected in the **Premium Status** Service\n\n` + 
        `**Reason:** ${info.reason}\n\n` +
        `**Growth:** ${info.growth}`
    )
    .setFooter(await utils.getDate())
    Discord_Bot.channels.get("543862697742172179").send(embed);
});