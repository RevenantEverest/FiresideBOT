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

const Discord_Bot = new config.Discord.Client();
const Discord_Commands = require('./Discord/commands/Discord_Commands');

const Twitch_Bot = new config.TMI.client(config.Twitch_Bot_Options);
const Twitch_Commands = require('./Twitch/commands/Twitch_Commands');

//Route Imports
const usersRouter = require('./routes/userRoutes');
const playlistsRouter = require('./routes/playlistRoutes');
const songsRouter = require('./routes/songRoutes');
const customCommandsRouter = require('./routes/customCommandRoutes');

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/users", usersRouter);
app.use("/playlists", playlistsRouter);
app.use("/songs", songsRouter);
app.use("/commands/custom", customCommandsRouter);

//Default Routes
app.use("/", (req, res) => {
  res.json({
    message: "Fireside API"
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Twitch Bot
Twitch_Bot.on('chat', (channel, userstate, message, self) => {
  if(self) return;
  Twitch_Commands.commands(channel, userstate, message, self, Twitch_Bot);
});

Twitch_Bot.connect();

//Discord Bot
Discord_Bot.on("ready", () => {
  // console.log("Hello World", Discord_Bot.guilds);
});

Discord_Bot.on("message", (message) => {
  if(message.author.equals(Discord_Bot.user)) return;
  Discord_Commands.commands(message);
});

Discord_Bot.login(config.Discord_Key);

// TODO: Economy feature
