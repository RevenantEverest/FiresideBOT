require('dotenv').config();

/* Dependencies */
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();

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
app.use("/users", require('./routes/UserRoutes/userRoutes'));
app.use("/guilds", require('./routes/GuildRoutes/guildRoutes'));

app.use("/guilds/settings", require('./routes/GuildRoutes/guildSettingsRoutes'));
app.use("/guild/playlists", require('./routes/GuildRoutes/guildPlaylistRoutes'));
app.use("/guild/songs", require('./routes/GuildRoutes/guildSongRoutes'));
app.use("/user/playlists", require('./routes/UserRoutes/userPlaylistRoutes'));
app.use("/user/songs", require('./routes/UserRoutes/userSongRoutes'));

app.use("/commands/custom", require('./routes/customCommandRoutes'));
app.use("/login", require('./routes/loginRoutes'));
app.use("/queue", require('./routes/queueRoutes'));
app.use("/autodj", require('./routes/autodjRoutes'));
app.use("/TBW", require('./routes/TBW_Routes'));
app.use("/currency/discord", require('./routes/discordCurrencyRoutes'));
app.use("/currency/settings", require('./routes/currencyRoutes'));
app.use("/trackers/twitch", require('./routes/twitchTrackerRoutes'));
app.use("/ranks/tiers", require('./routes/discordRankRoutes'));
app.use("/ranks/settings", require('./routes/discordRankSettingsRoutes'));
app.use("/ranks/records", require('./routes/discordRankRecordRoutes'));

app.use("/discord", require('./routes/discordAPIRoutes'));

/* Default Routes */
app.use("/", (req, res) => res.json({ message: "Fireside API" }));

/* PROD */
let server = http.createServer(app);
server.listen(process.env.API_PORT, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` Fireside-API: Listening on port ${process.env.API_PORT}`));