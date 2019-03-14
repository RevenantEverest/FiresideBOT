
/* Dependencies */
const fs = require('fs');
const http = require('http');
const https = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();

// const ssl = {
//   key: fs.readFileSync(process.env.SSL_PRIVKEY),
//   cert: fs.readFileSync(process.env.SSL_FULLCHAIN),
//   ca: fs.readFileSync(process.env.SSL_CHAIN)
// };

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

/* Routes */
app.use("/users", require('./routes/UserRoutes/userRoutes'));

app.use("/guild/playlists", require('./routes/GuildRoutes/guildPlaylistRoutes'));
app.use("/guild/songs", require('./routes/GuildRoutes/guildSongRoutes'));
app.use("/user/playlists", require('./routes/UserRoutes/userPlaylistRoutes'));
app.use("/user/songs", require('./routes/UserRoutes/userSongRoutes'));

app.use("/commands/custom", require('./routes/customCommandRoutes'));
app.use("/login", require('./routes/loginRoutes'));
app.use("/guilds", require('./routes/GuildRoutes/guildRoutes'));
app.use("/queue", require('./routes/queueRoutes'));
app.use("/autodj", require('./routes/autodjRoutes'));
app.use("/TBW", require('./routes/TBW_Routes'));
app.use("/regulars", require('./routes/regularsRoutes'));
app.use("/currency/discord", require('./routes/discordCurrencyRoutes'));
app.use("/currency/settings", require('./routes/currencyRoutes'));

app.use("/discord", require('./routes/discordAPIRoutes'));

/* Default Routes */
app.use("/", (req, res) => res.json({ message: "Fireside API" }));

/* PROD */
let server = http.createServer(app);
server.listen(3001, () => console.log(chalk.hex("#00ff00")(`[HTTP]`) +  ` Fireside-API: Listening on port 3001`));
// https.createServer(ss, app).listen(3443, () => console.log(`[HTTPS] Fireside-API: Listening on port 3443`));

const Twitch_Bot = require('./Twitch/Twitch_Bot');

Twitch_Bot.connect();

module.exports = server;