const express = require('express');
const guildPlaylistsController = require('../../controllers/GuildCOntrollers/guildPlaylistsController');
const guildPlaylistsRouter = express.Router();

guildPlaylistsRouter.route("/")
.get(guildPlaylistsController.index)
.post(guildPlaylistsController.create)

guildPlaylistsRouter.route("/playlistName/:playlist_name")
.get(guildPlaylistsController.getByPlaylistName)

guildPlaylistsRouter.route("/delete/:id")
.delete(guildPlaylistsController.destroy)

guildPlaylistsRouter.route("/guild/:id")
.get(guildPlaylistsController.getByGuildId)

module.exports = guildPlaylistsRouter;
