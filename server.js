require('dotenv').config();

//Dependencies
const config = require('./config/config');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const Discord_Bot = require('./Discord/Discord_Bot');
const Twitch_Bot = require('./Twitch/Twitch_Bot');

//Route Imports
const usersRouter = require('./routes/userRoutes');
const playlistsRouter = require('./routes/playlistRoutes');
const songsRouter = require('./routes/songRoutes');
const customCommandsRouter = require('./routes/customCommandRoutes');
const loginRouter = require('./routes/login/loginRoutes');
const guildRouter = require('./routes/guildRoutes');

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/users", usersRouter);
app.use("/playlists", playlistsRouter);
app.use("/songs", songsRouter);
app.use("/commands/custom", customCommandsRouter);
app.use("/login", loginRouter);
app.use("/guilds", guildRouter);

//Default Routes
app.use("/", (req, res) => {
  res.json({
    message: "Fireside API"
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Bot Logins
Twitch_Bot.connect();
Discord_Bot.login(config.Discord_Key);
