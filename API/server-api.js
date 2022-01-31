require('dotenv').config();

/* Dependencies */
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const verifyToken = require('./middleware/verifyToken');
const verifyAdminToken = require('./middleware/verifyAdminToken');

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
app.use("/uploads", verifyToken, express.static("uploads"));

app.use("/login", require('./routes/loginRoutes'));
app.use("/login/admin", require('./routes/loginAdminRoutes'));
app.use("/verify", require('./routes/verifyRoutes'));

app.use("/users", verifyToken, require('./routes/UserRoutes/userRoutes'));
app.use("/guilds", verifyToken, require('./routes/GuildRoutes/guildRoutes'));

app.use("/guilds/settings", verifyToken, require('./routes/GuildRoutes/guildSettingsRoutes'));
app.use("/guild/playlists", verifyToken, require('./routes/GuildRoutes/guildPlaylistRoutes'));
app.use("/guild/songs", verifyToken, require('./routes/GuildRoutes/guildSongRoutes'));
app.use("/guild/members/new", verifyToken, require('./routes/newGuildMembersRoutes'));
app.use("/guilds/embed", verifyToken, require('./routes/GuildRoutes/guildEmbedRoutes'));
app.use("/guild/analytics", verifyToken, require('./routes/GuildRoutes/guildAnalyticsRoutes'));

app.use("/user/playlists", verifyToken, require('./routes/UserRoutes/userPlaylistRoutes'));
app.use("/user/songs", verifyToken, require('./routes/UserRoutes/userSongRoutes'));

app.use("/commands/custom", verifyToken, require('./routes/customCommandRoutes'));

app.use("/queue", verifyToken, require('./routes/queueRoutes'));
app.use("/autodj", verifyToken, require('./routes/autodjRoutes'));
app.use("/TBW", verifyToken, require('./routes/TBW_Routes'));
app.use("/currency/discord", verifyToken, require('./routes/discordCurrencyRoutes'));
app.use("/currency/settings", verifyToken, require('./routes/currencyRoutes'));
app.use("/trackers/twitch", verifyToken, require('./routes/twitchTrackerRoutes'));
app.use("/ranks/tiers", verifyToken, require('./routes/discordRankRoutes'));
app.use("/ranks/settings", verifyToken, require('./routes/discordRankSettingsRoutes'));
app.use("/ranks/records", verifyToken, require('./routes/discordRankRecordRoutes'));
app.use("/welcome_message", verifyToken, require('./routes/welcomeMessageRoutes'));

app.use("/discord", require('./routes/discordAPIRoutes'));
app.use("/commands", require("./routes/commandRoutes"));
app.use("/changelogs", require('./routes/changelogRoutes'));

/* Admin Routes */
app.use("/admin/guilds", verifyAdminToken, require('./routes/AdminRoutes/guildRoutes'));
app.use("/admin/commands/logs", verifyToken, require("./routes/AdminRoutes/commandLogRoutes"));
app.use("/admin/working_changelogs", verifyAdminToken, require('./routes/AdminRoutes/workingChangelogRoutes'));
app.use("/admin/system", verifyAdminToken, require('./routes/AdminRoutes/systemRoutes'));
app.use("/admin/servers/array", verifyAdminToken, require('./routes/AdminRoutes/serverArrayRoutes'));

/* Linear App Webhook */
app.use("/linear", require('./routes/linearRoutes'));

/* Top.gg Webhook */
app.use("/topgg", require('./routes/topggRoutes'));

/* Default Routes */
app.use("/", (req, res) => res.json({ message: "Fireside API" }));

/* PROD */
let server = http.createServer(app);
server.listen(process.env.API_PORT, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` Fireside-API: Listening on port ${process.env.API_PORT}`));