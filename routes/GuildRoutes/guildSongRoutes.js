const express = require('express');
const guildSongsController = require('../../controllers/GuildControllers/guildSongsController');
const guildSongsRouter = express.Router();

guildSongsRouter.route("/")
.get(guildSongsController.index)
.post(guildSongsController.addSong)

guildSongsRouter.route("/playlist/:id")
.get(guildSongsController.getByPlaylistId)

guildSongsRouter.route("/song_id/:id")
.delete(guildSongsController.delete)


module.exports = guildSongsRouter;
