require('dotenv').config();

/* Dependencies */
const config = require('./config/config');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const Discord_Bot = require('./Discord/Discord_Bot');
const Twitch_Bot = require('./Twitch/Twitch_Bot');

/* Route Imports */
const usersRouter = require('./routes/UserRoutes/userRoutes');

const guildPlaylistsRouter = require('./routes/GuildRoutes/guildPlaylistRoutes');
const guildSongsRouter = require('./routes/GuildRoutes/guildSongRoutes');
const userPlaylistsRouter = require('./routes/UserRoutes/userPlaylistRoutes');
const userSongsRouter = require('./routes/UserRoutes/userSongRoutes');

const customCommandsRouter = require('./routes/customCommandRoutes');
const loginRouter = require('./routes/loginRoutes');
const guildRouter = require('./routes/GuildRoutes/guildRoutes');
const queueRouter = require('./routes/queueRoutes');
const autodjRouter = require('./routes/autodjRoutes');
const TBW_Router = require('./routes/TBW_Routes');
const regularsRouter = require('./routes/regularsRoutes');
const discordCurrencyRouter = require('./routes/discordCurrencyRoutes');
const currencyRouter = require('./routes/currencyRoutes');

const discordAPIRouter = require('./routes/discordAPIRoutes');

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/users", usersRouter);

app.use("/guild/playlists", guildPlaylistsRouter);
app.use("/guild/songs", guildSongsRouter);
app.use("/user/playlists", userPlaylistsRouter);
app.use("/user/songs", userSongsRouter);

app.use("/commands/custom", customCommandsRouter);
app.use("/login", loginRouter);
app.use("/guilds", guildRouter);
app.use("/queue", queueRouter);
app.use("/autodj", autodjRouter);
app.use("/TBW", TBW_Router);
app.use("/regulars", regularsRouter);
app.use("/currency/discord", discordCurrencyRouter);
app.use("/currency/settings", currencyRouter);

app.use("/discord", discordAPIRouter);

/* Default Routes */
app.use("/", (req, res) => {
  res.json({
    message: "Fireside API"
  });
});

app.listen(PORT, () => {
  console.log(`Fireside API: Listening on port ${PORT}`);
});

/* Bot Logins */
// Twitch_Bot.connect();
Discord_Bot.login(config.Discord_Key);
